import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { PageContext } from "../Context/OptionPage";

export default function SignUp() {
  const [ , , , SetIsMenuBar, , setMessage] = useContext(PageContext);

  const [UserForm, SetUserForm] = useState({
    Name: "",
    Email: "",
    Password: "",
    PasswordConfirm: "",
  });

  const [WrongFrom, setWrongFrom] = useState(true);

  const [Token, SetToken] = useState("");

  const navigate = useNavigate();

  const Change = (e) => {
    const { name, value } = e.target;
    SetUserForm({ ...UserForm, [name]: value });
  };

  const LoginGoogle = useGoogleLogin({
    onSuccess: (result) => {
      SetToken(result.access_token);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const HandleSignUp = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/Account/CheckEmail", {
        Email: UserForm.Email,
      })
      .then((result) => {
        if (result.data.Status === "Success") {
          if (UserForm.Password !== UserForm.PasswordConfirm) {
            setWrongFrom(false);
            setMessage({
              OnShow: true,
              Content: "Mật khẩu không trùng nhau!",
            });
          } else {
            axios
              .post("http://localhost:9000/Account/SignUp", {
                Name: UserForm.Name,
                Email: UserForm.Email,
                Password: UserForm.Password,
                DateCreate: GetDayNow(),
              })
              .then((result) => {
                setWrongFrom(true);
                window.localStorage.setItem("Email", result.data.Email);
                window.localStorage.setItem("TokenPs", result.data.Password);
                navigate("/");
              });
          }
        }else{
          setMessage({
            OnShow: true,
            Content: "Email này đã được sử dụng!",
          });
        }
      });
  };

  const GetDayNow = () => {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const formattedDate = `${day < 10 ? "0" + day : day}-${
      month < 10 ? "0" + month : month
    }-${year}`;
    return formattedDate;
  };

  useEffect(() => {
    SetIsMenuBar(isMenuBar => ({
      ...isMenuBar,
      TopBar: false,
      OptionAccountBar: false
    }))
  })

  useEffect(() => {
    const HandelSave = (Acc) => {
      axios
        .post("http://localhost:9000/Account/CheckEmail", { Email: Acc.email })
        .then((result) => {
          if (result.data.Status === "Success") {
            axios
              .post("http://localhost:9000/Account/SignUp", {
                Name: Acc.name,
                Email: Acc.email,
                Password: Acc.id,
                DateCreate: GetDayNow(),
              })
              .then((result) => {
                window.localStorage.setItem("Email", result.data.Email);
                window.localStorage.setItem("TokenPs", result.data.Password);
                navigate("/");
              });
          } else {
            setMessage({
              OnShow: true,
              Content: "Email này đã được sử dụng!",
            });
          }
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
          HandelSave(Acc.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [Token, navigate, setMessage]);

  return (
    <div>
      <div className="fixed w-full">
        <img alt="" src="./Image/Bg-SignIn.jpg" />
      </div>
      <div className="flex flex-col fixed w-full h-full justify-center items-center z-[1]">
        <div className="flex flex-col bg-neutral-200 rounded-3xl gap-7 shadow-black shadow-2xl pb-5">
          <div>
            <form
              className="flex flex-col items-center gap-5"
              onSubmit={HandleSignUp}
            >
              <div className="pt-4 ">
                <p className="font-bold text-[30px] text-slate-500">ĐĂNG KÝ</p>
              </div>
              <div className="pl-3 pr-3">
                <input
                  className="w-80 p-2 rounded-xl outline-none"
                  type="text"
                  placeholder="Tên"
                  maxLength={35}
                  minLength={5}
                  name="Name"
                  onChange={Change}
                ></input>
              </div>
              <div className="pl-3 pr-3">
                <input
                  className="w-80 p-2 rounded-xl outline-none"
                  type="email"
                  placeholder="Email"
                  name="Email"
                  onChange={Change}
                ></input>
              </div>
              <div className="pl-3 pr-3">
                <input
                  className="w-80 p-2 rounded-xl outline-none"
                  type="password"
                  placeholder="Mật Khẩu"
                  name="Password"
                  onChange={Change}
                  minLength={5}
                ></input>
              </div>
              <div className="pl-3 pr-3">
                <input
                  className={
                    WrongFrom === true
                      ? "w-80 p-2 rounded-xl outline-none"
                      : "w-80 p-2 rounded-xl outline-none border-red-500 border-2"
                  }
                  type="password"
                  placeholder="Xác nhận mật Khẩu"
                  name="PasswordConfirm"
                  minLength={5}
                  onChange={Change}
                ></input>
              </div>
              <div className="relative w-full">
                <div className="absolute w-full flex justify-center items-center h-[50px]">
                  <div>
                    <button
                      type="submit"
                      className="bg-slate-500 pt-3 pb-3 pl-4 pr-4 rounded-xl text-slate-200 duration-100 ease-in border-slate-500 hover:bg-slate-200 hover:border-2 hover:text-slate-500"
                    >
                      Xác Nhận
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="pb-4 pt-10 flex flex-col w-full justify-center items-center gap-3">
            <div>
              <p className="text-center">
                Bạn đã có tài khoản?
                <br />
                <Link className="text-sky-500 hover:font-bold" to="/SignIn">
                  Đến đăng nhập
                </Link>
              </p>
            </div>
            <div className="relative w-full h-full pt-2">
              <div className="absolute w-full h-full flex justify-center items-center">
                <div>
                  <button
                    className="group flex justify-center items-center gap-4 bg-white pt-1 pb-1 pl-4 pr-4 rounded-xl duration-100 ease-linear border-red-500 hover:border-2"
                    onClick={LoginGoogle}
                  >
                    <div>
                      <i class="fa-brands fa-google text-[25px] text-red-500 "></i>
                    </div>
                    <div>Đăng ký với Google</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
