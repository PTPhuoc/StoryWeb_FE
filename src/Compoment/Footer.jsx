
export default function Footer() {
  return (
    <div className="flex flex-wrap w-full justify-center items-center pl-5r pr-5r bg-white mt-5 p-5">
      <div className="pl-5r pr-5r">
        <p className="font-bold text-black">
          <i className="fa-regular fa-copyright"></i> PUsen{" "}
          <i class="fa-solid fa-minus"></i> PHAN TÂN PHƯỚC
        </p>
      </div>
      <div className="pl-5r pr-5r">
        <a className="flex justify-center items-center gap-1r" href="https://www.facebook.com/profile.php?id=100050163765479">
          <div>
            <i className="fa-brands fa-facebook text-3xl text-blue-800"></i>
          </div>
          <div>
            <p className="font-bold text-black">PHAN TÂN PHƯỚC</p>
          </div>
        </a>
      </div>
      <div className="flex justify-center items-center gap-1r pl-5r pr-5r">
        <div>
          <i className="fa-brands fa-google text-3xl text-red-700"></i>
        </div>
        <div>
          <p className="font-bold text-black">tanphuocphan370@gmail.com</p>
        </div>
      </div>
    </div>
  );
}
