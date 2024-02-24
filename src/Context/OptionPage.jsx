import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const PageContext = createContext();

export default function OptionPage({ Compoment }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuBar, SetIsMenuBar] = useState({
    TopBar: true,
    OptionAccountBar: false,
    Footer: true
  });
  const [Message, setMessage] = useState({
    OnShow: false,
    Content: "",
  });

  const [InforAccount, setInforAccount] = useState({});

  useEffect(() => {
    if (Message.OnShow === true) {
      setTimeout(() => {
        setMessage({
          Content: "",
          OnShow: false,
        });
      }, 10000);
    }
  }, [Message]);

  const Email = window.localStorage.getItem("Email");
  const Password = window.localStorage.getItem("TokenPs");

  useEffect(() => {
    if (Email || Password) {
      axios
        .post("http://localhost:9000/Account/GetAccount", {
          Email: Email,
          Password: Password,
        })
        .then((result) => {
          setInforAccount(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Email, Password]);

  return (
    <PageContext.Provider
      value={[
        isLoading,
        setIsLoading,
        isMenuBar,
        SetIsMenuBar,
        Message,
        setMessage,
        InforAccount,
      ]}
    >
      {Compoment}
    </PageContext.Provider>
  );
}
