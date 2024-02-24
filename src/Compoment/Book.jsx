import React, { useContext, useEffect, useState } from "react";
import BookLeft from "../TaskBar/BookLeft";
import DecriptionBook from "./DecriptionBook";
import axios from "axios";
import { PageContext } from "../Context/OptionPage";

export default function Book() {
  const [Content, SetContent] = useState("");
  const Name = window.localStorage.getItem("NameBook");
  const Chapter = window.localStorage.getItem("NumberChapter");
  const NameChapter = window.localStorage.getItem("NameChapter");
  const [, setIsLoading] = useContext(PageContext);

  const [ , , , SetIsMenuBar ] = useContext(PageContext)
  useEffect(() => {
    SetIsMenuBar(isMenuBar => ({
      ...isMenuBar,
      TopBar: true,
      OptionAccountBar: false
    }))
  })

  useEffect(() => {
    axios
      .post("http://localhost:9000/Story/GetChapter", {
        Name: Name,
        NumberChapter: Chapter,
      })
      .then((result) => {
        if(NameChapter === null){
          window.localStorage.setItem("NameChapter", result.data[0].Name_Chapter)
        }
        SetContent(result.data[0].Content);
      })
      .catch((err) => {
        console.log(err);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [Name, Chapter, setIsLoading, NameChapter]);

  return (
    <div>
      <div>
        <BookLeft />
      </div>
      <div className="mt-7r ml-[215px] mr-[220px] pt-2 bg-neutral-100">
        <h2 className="text-center text-[30px]">Chương {Chapter}</h2>
        <h2 className="text-center text-[35px]">{NameChapter}</h2>
        <br></br>
        <p dangerouslySetInnerHTML={{ __html: Content }} className="p-2"></p>
      </div>
      <div>
        <DecriptionBook />
      </div>
    </div>
  );
}
