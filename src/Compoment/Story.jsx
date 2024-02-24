import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../Context/OptionPage.jsx";
import axios from "axios";

export default function Story() {
  const [Search, SetSearch] = useState("");
  const [ListBook, SetListBook] = useState([]);
  const [, setIsLoading] = useContext(PageContext);

  const [ , , , SetIsMenuBar ] = useContext(PageContext)
  useEffect(() => {
    SetIsMenuBar(isMenuBar => ({
      ...isMenuBar,
      TopBar: true,
      OptionAccountBar: false
    }))
  })

  const HandleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:9000/Book/ListByName", { Name: Search })
      .then((result) => {
        setTimeout(() => {
          SetListBook(result.data);
          setIsLoading(false);
        }, 1000);
      })
      .catch(() => {
        setTimeout(() => {
          SetListBook([]);
          setIsLoading(false);
        }, 1000);
      });
  };

  const Change = (e) => {
    SetSearch(e.target.value);
  };

  const navigate = useNavigate();

  const HandelClick = (Name) => {
    setIsLoading(true);
    const NameBook = window.localStorage.getItem("NameBook");
    if (NameBook !== Name) {
      window.localStorage.setItem("NameBook", Name);
      window.localStorage.setItem("NumberChapter", "1");
    } else {
      if (window.localStorage.getItem("NumberChapter") === null) {
        window.localStorage.setItem("NumberChapter", "1");
      }
    }
    axios
      .post("http://localhost:9000/Book/AddViews", {
        Name: window.localStorage.getItem("NameBook"),
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/Book");
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:9000/Book/ListAll")
      .then((result) => {
        SetListBook(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [setIsLoading]);

  return (
    <div className="flex flex-col mt-[100px]">
      <div className="w-full bg-zinc-500 pl-5 pt-2 pb-2">
        <form
          className="flex items-center"
          method="post"
          onSubmit={HandleSubmit}
        >
          <div>
            <input
              className="w-[300px] pl-1r pt-1 pr-1 pb-1 outline-none rounded-tl-xl rounded-bl-xl"
              placeholder="Tìm Sách..."
              type="text"
              onChange={Change}
            ></input>
          </div>
          <div className="group">
            <button
              type="submit"
              className="bg-zinc-300 pl-2 pt-1 pb-1 pr-2 rounded-tr-xl rounded-br-xl duration-[0.3s] ease-linear group-hover:bg-black group-active:bg-zinc-300"
            >
              <i className="fa-solid fa-magnifying-glass group-hover:text-white"></i>
            </button>
          </div>
        </form>
      </div>
      {ListBook.length === 0 ? (
        <div className="flex flex-col w-full h-[500px] justify-center items-center bg-white">
          <div>
            <i className="fa-solid fa-book-open text-[200px] opacity-70"></i>
          </div>
          <div className="opacity-70">
            <p className="font-bold">CÓ VẺ BẠN NÊN TÌM SÁCH KHÁC</p>
          </div>
        </div>
      ) : (
        ListBook.map((i) => (
          <div className="p-5" key={i._id}>
            <button
              className="group flex relative gap-5 rounded-2xl items-center bg-white"
              onClick={() => HandelClick(i.Name)}
            >
              <span className="absolute top-0 h-full left-0 bg-white group-hover:bg-zinc-200 rounded-tl-2xl rounded-bl-2xl rounded-tr-[100px] rounded-br-[100px] w-1p group-hover:w-5p duration-[0.5s] ease-out group-active:w-full group-active:rounded-2xl"></span>
              <div className="z-[1]">
                <img
                  className="w-60 rounded-2xl"
                  src={"./Image/" + i.Image}
                  alt="HyLap.png"
                />
              </div>
              <div className="flex flex-col w-8p z-[1]">
                <div>
                  <p className="text-left font-bold">{i.Name}</p>
                </div>
                <div>
                  <p className="text-left">Tác Giả: {i.Author}</p>
                </div>
                <div>
                  <p className="text-left">{i.Describe}</p>
                </div>
              </div>
            </button>
          </div>
        ))
      )}
    </div>
  );
}
