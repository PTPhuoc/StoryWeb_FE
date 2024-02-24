import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { PageContext } from "../Context/OptionPage";

export default function Home() {
  const [Popular, setPopular] = useState([]);

  const HandelClick = (Name) => {
    const NameBook = window.localStorage.getItem("NameBook");
    if (NameBook !== Name) {
      window.localStorage.setItem("NameBook", Name);
      window.localStorage.setItem("NumberChapter", "1");
    }else{
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
  };

  const [ , , , SetIsMenuBar ] = useContext(PageContext)
  useEffect(() => {
    SetIsMenuBar(isMenuBar => ({
      ...isMenuBar,
      TopBar: true,
      OptionAccountBar: false
    }))
  })

  useEffect(() => {
    axios
      .get("http://localhost:9000/Book/Popular")
      .then((result) => {
        setPopular(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col pt-8r pr-5 gap-5">
      <div className="flex justify-start items-start gap-5">
        <div>
          <img
            className="h-full rounded-tr-2xl rounded-br-2xl"
            src="./Image/Home-Top.png"
            alt="Home-Top.png"
          />
        </div>
        <div className="w-full flex flex-col items-center gap-5 ">
          <div className="w-full flex flex-col items-center gap-5 bg-white rounded-2xl p-5 shadow-c1">
            <div>
              <p>
                <span className="font-bold">Truyện thần thoại</span> là một thể
                loại văn hóa lâu đời, kể về các câu chuyện về các vị thần, anh
                hùng và sự sáng tạo của thế giới. Những câu chuyện này thường
                được truyền miệng qua nhiều thế hệ, làm giàu và bảo tồn văn hóa
                của một cộng đồng. Thần thoại không chỉ là những câu chuyện đơn
                thuần, mà còn chứa đựng sức mạnh tượng trưng, những giáo lý văn
                hóa và triết học, đồng thời thường xuyên mang đến những giả
                tưởng phi thực tế, nơi mà con người và siêu nhiên giao thoa một
                cách huyền bí.
              </p>
            </div>
            <div>
              <Link
                to="/Story"
                className="p-2 bg-grey-1 rounded-md shadow-c1 hover:bg-grey-4 hover:text-white duration-75 ease-linear"
              >
                Đọc Ngay
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col items-start gap-1 bg-white rounded-2xl p-5 shadow-c1">
            <div>
              <p className="text-start font-bold">Đọc Nhiều</p>
            </div>
            <div className="h-1 w-full bg-grey-3"></div>
            <div className="group flex gap-5 duration-75 ease-linear hover:text-white">
              {Popular.map((i) => (
                <Link
                  key={i._id}
                  to="/Book"
                  onClick={() => HandelClick(i.Name)}
                >
                  <div className="flex gap-5 items-center bg-grey-1 rounded-md pr-5 shadow-c1 duration-75 ease-linear group-hover:bg-grey-4">
                    <div>
                      <img
                        className="w-12r rounded-tl-md rounded-bl-md"
                        src={"./Image/" + i.Image}
                        alt="HyLap.png"
                      />
                    </div>
                    <div className="w-[100px] text-center">
                      <p>{i.Name}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-10 pl-5 justify-center item-start">
        <div className="flex flex-col gap-1r w-90 bg-white rounded-2xl shadow-c1">
          <div>
            <img
              className="rounded-tl-2xl rounded-tr-2xl"
              src="./Image/Team.png"
              alt="Team.png"
            />
          </div>
          <div>
            <p className="p-1r">
              <span className="font-bold">Đội ngũ dịch</span> của chúng tôi là
              nhóm chuyên nghiệp, tận tâm và sáng tạo, đồng lòng hướng tới mục
              tiêu chất lượng cao. Với sự đa dạng về ngôn ngữ và kiến thức
              chuyên môn, chúng tôi cam kết mang đến những bản dịch chính xác và
              sáng tạo, đồng thời hiểu rõ nhu cầu đặc biệt của mỗi dự án. Sự
              chuyên nghiệp, linh hoạt và tận tâm là những đặc điểm đặc trưng
              của đội ngũ dịch của chúng tôi.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1r w-90 bg-white rounded-2xl shadow-c1">
          <div>
            <img
              className="rounded-tl-2xl rounded-tr-2xl"
              src="./Image/Book.png"
              alt="Book.png"
            />
          </div>
          <div>
            <p className="p-1r">
              Những <span className="font-bold">Nhà cung cấp truyện</span> uy
              tín mà chúng tôi giới thiệu đều là những đối tác đáng tin cậy, cam
              kết mang đến trải nghiệm đọc truyện chất lượng và đa dạng. Với sự
              chăm sóc kỹ lưỡng về nội dung, giao diện thân thiện và tính tương
              tác cao, họ làm cho việc khám phá thế giới truyện trở nên thú vị
              và an toàn. Hãy dành thời gian thư giãn và khám phá những câu
              chuyện tuyệt vời từ những đối tác đáng tin cậy của chúng tôi.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1r w-90 bg-white rounded-2xl shadow-c1">
          <div>
            <img
              className="rounded-tl-2xl rounded-tr-2xl"
              src="./Image/Trust.png"
              alt="Trust.png"
            />
          </div>
          <div>
            <p className="p-1r">
              <span className="font-bold">Tự do đánh giá sản phẩm</span> là
              quyền của khách hàng tại chúng tôi. Chúng tôi tôn trọng và đánh
              giá cao mọi ý kiến phản hồi. Khách hàng có quyền chia sẻ trải
              nghiệm cá nhân, từ đó giúp cộng đồng xây dựng quyết định thông
              tin. Sự minh bạch và sẵn sàng lắng nghe là tiêu chí quan trọng,
              giúp chúng tôi không ngừng cải thiện và đáp ứng mong muốn của
              khách hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
