import Footer from "./Compoment/Footer";
import Home from "./Compoment/Home";
import Story from "./Compoment/Story";
import Top from "./TaskBar/Top";
import { Routes, Route } from "react-router-dom";
import { PageContext } from "./Context/OptionPage";
import { useContext } from "react";
import Loading from "./Compoment/Loading";
import Book from "./Compoment/Book";
import SignIn from "./Compoment/SignIn";
import SignUp from "./Compoment/SignUp";
import Message from "./Compoment/Message";
import Account from "./Compoment/Account";
import OptionAccount from "./TaskBar/OptionAccount";

export default function MainPage() {
  const [isLoading, , isMenuBar] = useContext(PageContext);

  return (
    <div className="overflow-hidden">
      <div className={isMenuBar.TopBar === false ? "hidden" : ""}>
        <Top />
      </div>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Story" element={<Story />} />
          <Route path="/Book" element={<Book />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Account" element={<Account />} />
        </Routes>
      </div>
      <div>
        <Message />
      </div>
      <div className={isMenuBar.OptionAccountBar === false ? "hidden" : ""}>
        <OptionAccount />
      </div>
      {isLoading === true ? (
        <div>
          <Loading />
        </div>
      ) : (
        <></>
      )}
      <footer className={isMenuBar.Footer === false ? "hidden" : ""}>
        <Footer />
      </footer>
    </div>
  );
}
