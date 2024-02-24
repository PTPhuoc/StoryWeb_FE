import React from "react";
import { Link } from "react-router-dom";

export default function OptionAccount() {
  return (
    <div className="fixed flex flex-col items-center top-[100px] left-0 h-full w-[200px] bg-neutral-200">
      <div className="w-full">
        <Link
          className="group relative flex justify-center items-center pt-2 pb-2 bg-slate-300 w-full border-slate-500 border-b-2"
          to="/Account"
        >
          <div className="z-[1]">Information</div>
          <span className="absolute top-0 left-0 h-full w-0 bg-slate-400 rounded-r-3xl duration-300 ease-linear group-hover:w-[50%] group-active:rounded-none group-active:w-full"></span>
        </Link>
      </div>
      <div className="w-full">
        <Link
          className="group relative flex justify-center items-center pt-2 pb-2 bg-slate-300 w-full border-slate-500 border-b-2"
          to="/Account/MarkBook"
        >
          <div className="z-[1]">Mark Book</div>
          <span className="absolute top-0 left-0 h-full w-0 bg-slate-400 rounded-r-3xl duration-300 ease-linear group-hover:w-[50%] group-active:rounded-none group-active:w-full"></span>
        </Link>
      </div>
    </div>
  );
}
