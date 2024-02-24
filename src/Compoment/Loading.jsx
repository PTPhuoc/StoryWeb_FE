import React from "react";

export default function Loading() {
  return (
    <div className="flex z-[4] top-0 opacity-70 justify-center items-center fixed w-full h-full bg-white">
      <div>
        <i class="fa-solid fa-book text-[80px] animate-pulse"></i>
      </div>
    </div>
  );
}
