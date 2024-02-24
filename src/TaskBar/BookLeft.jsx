import axios from "axios";
import React, { useEffect, useState } from "react";

export default function BookLeft() {
  const [ChapterDetail, setChapterDetail] = useState([]);

  useEffect(() => {
    if (window.localStorage.getItem("NumberChapter") === null) {
      window.localStorage.setItem("NumberChapter", "1");
    }
    const NameBook = window.localStorage.getItem("NameBook");
    axios
      .post("http://localhost:9000/Story/GetAllChapter", { Name: NameBook })
      .then((result) => {
        setChapterDetail(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const HandelEvent = (NameChapter) => {
    window.localStorage.setItem("NameChapter", NameChapter);
  };

  return (
    <div className="fixed flex justify-start items-center flex-col gap-2 left-0 z-[4] top-[85px] h-full bg-neutral-200 overflow-auto">
      {ChapterDetail.map((i) => (
        <div key={i._id + i.Number_Chapter + i.Name_Chapter}>
          <button
            className={
              window.localStorage.getItem("NumberChapter") ===
              String(i.Number_Chapter)
                ? "group flex p-2 mr-2 ml-2 gap-2 mt-2 rounded-md bg-black text-white items-center"
                : "group flex p-2 mr-2 ml-2 gap-2 mt-2 hover:rounded-md duration-200 ease-linear hover:bg-black hover:text-white bg-white items-center"
            }
            onClick={() => HandelEvent(i.Name_Chapter)}
          >
            <div className="pr-3 text-center">
              <p className="w-10r overflow-hidden whitespace-nowrap truncate">
                {i.Name_Chapter}
              </p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}
