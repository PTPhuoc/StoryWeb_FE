import { useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../Context/OptionPage";

export default function Top() {
  const [, , , , , , InforAccount] = useContext(PageContext);
  return (
    <div className="fixed z-[3] top-0 w-full flex justify-between items-center pl-5r pr-5r pt-5 pb-5 bg-grey-4 text-white">
      <div>
        <Link to="/">
          PUsen <span>Book</span>
        </Link>
      </div>
      <div className="flex justify-stretch items-center gap-5 translate-y-1">
        <div>
          <Link to="/" className="group">
            HOME
            <span className="block h-1 w-full bg-white translate-y-1 rounded-2xl opacity-0 duration-75 ease-in group-hover:opacity-100 group-hover:translate-y-0"></span>
          </Link>
        </div>
        <div>
          <Link to="/Notifi" className="group">
            NOTIFI
            <span className="block h-1 w-full bg-white translate-y-1 rounded-2xl opacity-0 duration-75 ease-in group-hover:opacity-100 group-hover:translate-y-0"></span>
          </Link>
        </div>
        <div>
          <Link to="/Story" className="group">
            STORY
            <span className="block h-1 w-full bg-white translate-y-1 rounded-2xl opacity-0 duration-75 ease-in group-hover:opacity-100 group-hover:translate-y-0"></span>
          </Link>
        </div>
        {InforAccount.Name ? (
          <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full border-white hover:border-2">
            <div className="absolute flex w-full h-full justify-center items-center">
              <div>
                <Link to="/Account">
              <img src={"./Image/" + InforAccount.Image} className="w-[70px] bg-white" alt=""/>
            </Link>
              </div>
              
            </div>
            
          </div>
        ) : (
          <div>
            <Link to="/SignIn" className="group">
              SIGN IN
              <span className="block h-1 w-full bg-white translate-y-1 rounded-2xl opacity-0 duration-75 ease-in group-hover:opacity-100 group-hover:translate-y-0"></span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
