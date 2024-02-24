import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PageContext } from "../Context/OptionPage";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function SignIn() {
  const [Token, SetToken] = useState("");

  const [WrongForm, setWrongFrom] = useState({
    Email: true,
    Password: true,
  });

  const [UserForm, setUserForm] = useState({
    Email: "",
    Password: "",
  });

  const [ , setIsLoading, , SetIsMenuBar, , setMessage] = useContext(PageContext);

  const Change = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...UserForm, [name]: value });
  };

  useEffect(() => {
    SetIsMenuBar(isMenuBar => ({
      ...isMenuBar,
      TopBar: false,
      OptionAccountBar: false
    }))
  });

  const LoginGoogle = useGoogleLogin({
    onSuccess: (result) => {
      setIsLoading(true)
      SetToken(result.access_token);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const navigate = useNavigate();

  const HandleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true)
    axios
      .post("http://localhost:9000/Account/SignIn", {
        Email: UserForm.Email,
        Password: UserForm.Password,
      })
      .then((result1) => {
        if (result1.data.Status === "Not Found") {
          setIsLoading(false)
          setWrongFrom({
            Email: false,
            Password: true
          });
          setMessage({
            OnShow: true,
            Content: UserForm.Email + " này chưa được tạo!",
          });
        } else if (result1.data.Status === "Fault") {
          setIsLoading(false)
          setWrongFrom({
            Password: false,
            Email: true
          });
          setMessage({
            OnShow: true,
            Content: "Mật khẩu không đúng!",
          });
        } else {
          axios
            .post("http://localhost:9000/Account/GetAccount", {
              Email: UserForm.Email,
            })
            .then((result2) => {
              setWrongFrom({
                Email: true,
                Password: true
              })
              window.localStorage.setItem("Email", result2.data.Email);
              window.localStorage.setItem("TokenPs", result2.data.Password);
              setIsLoading(false)
              navigate("/");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
  };

  useEffect(() => {
    const HandleTake = (Acc) => {
      axios
        .post("http://localhost:9000/Account/CheckEmail", { Email: Acc.email })
        .then((result1) => {
          if (result1.data.Status === "Fault") {
            axios
              .post("http://localhost:9000/Account/GetAccount", {
                Email: Acc.email,
              })
              .then((result2) => {
                window.localStorage.setItem("Email", result2.data.Email);
                window.localStorage.setItem("TokenPs", result2.data.Password);
                setIsLoading(false)
                navigate("/");
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            setMessage({
              OnShow: true,
              Content: Acc.email + " này chưa được tạo!",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    if (Token) {
      axios
        .get(
          "https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + Token,
          {
            headers: {
              Authorization: "Bearer " + Token,
              Accept: "application/json",
            },
          }
        )
        .then((Acc) => {
          HandleTake(Acc.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Token, navigate, setMessage, setIsLoading]);

  return (
    <div>
      <div className="fixed w-full">
        <img alt="" src="./Image/Bg-SignIn.jpg" />
      </div>
      <div className="flex flex-col fixed w-full h-full justify-center items-center z-[1]">
        <div className="flex flex-col bg-neutral-200 rounded-3xl gap-7  shadow-black shadow-2xl pb-10">
          <div>
            <form className="flex flex-col items-center gap-5" onSubmit={HandleSignIn}>
              <div className="pt-4 ">
                <p className="font-bold text-[30px] text-slate-500">
                  ĐĂNG NHẬP
                </p>
              </div>
              <div className="pl-3 pr-3">
                <input
                  className={WrongForm.Email === false ? "w-80 p-2 rounded-xl outline-none border-red-500 border-2" : "w-80 p-2 rounded-xl outline-none"}
                  type="text"
                  placeholder="Email"
                  name="Email"
                  onChange={Change}
                ></input>
              </div>
              <div className="pl-3 pr-3">
                <input
                  className={WrongForm.Password === false ? "w-80 p-2 rounded-xl outline-none border-red-500 border-2" : "w-80 p-2 rounded-xl outline-none"}
                  type="password"
                  placeholder="Mật Khẩu"
                  name="Password"
                  onChange={Change}
                ></input>
              </div>
              <div className="relative w-full">
                <div className="absolute w-full flex justify-center items-center h-[50px]">
                  <div>
                    <button className="bg-slate-500 pt-3 pb-3 pl-4 pr-4 rounded-xl text-slate-200 duration-200 ease-in border-slate-500 hover:bg-slate-200 hover:border-2 hover:text-slate-500">
                      Xác Nhận
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="pt-10">
            <p className="text-center">
              <Link className="text-sky-500 hover:font-bold">
                Quên mật khẩu?
              </Link>
              <br />
              Bạn chưa có tài khoản?
              <br />
              <Link className="text-sky-500 hover:font-bold" to="/SignUp">
                Tạo tài khoản
              </Link>
            </p>
          </div>
          <div className="relative w-full h-full">
            <div className="absolute w-full h-full flex justify-center items-center">
              <div>
                <button
                  className="group flex justify-center items-center gap-4 bg-white pt-1 pb-1 pl-4 pr-4 rounded-xl duration-100 ease-linear border-red-500 hover:border-2"
                  onClick={LoginGoogle}
                >
                  <div>
                    <i class="fa-brands fa-google text-[25px] text-red-500 "></i>
                  </div>
                  <div>Đăng nhập với Google</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
