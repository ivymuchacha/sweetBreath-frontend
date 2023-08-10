import { useState } from "react";
import NewsItem from "./NewsItem";

const MOCK_DATA = [
  {
    src: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?cs=srgb&dl=pexels-suzy-hazelwood-1126359.jpg&fm=jpg",
    itemId: 1,
    itemTitle: "給長輩的甜點",
    itemTime: "2020/12/10",
    itemDesc:
      "每年年底是草莓開始採收的季節，這時草莓酸比甜多，酸甜比特別香濃明顯。搭配輕乳酪，一口咬下帶來豐富層次感，酸甜酸甜交錯，不甜膩得剛剛好，是長輩特別喜愛的鹹甜茶點。今年特別設計節慶禮盒，也歡迎自備購物袋，可折抵消費喔！　攝影／SuzyHazelwood"
  },
  {
    src: "https://images.pexels.com/photos/952724/pexels-photo-952724.jpeg?cs=srgb&dl=pexels-trang-doan-952724.jpg&fm=jpg",
    itemId: 2,
    itemTitle: "年輕的心意",
    itemTime: "2020/12/01",
    itemDesc:
      "偶爾心血來潮，總是想買點好吃的陪伴父母品嚐，但是父母可能總是不捨得你花錢，或覺得不吃甜點也能過日子。我們特別推出一款看起來迷你但又豐滿的水果甜點，可指定當季水果，以當季食材製作，因此降低成本，更重要的是支持在地農業，讓你用少少的錢帶豐盛的甜點開心回家，父母再怎麼捨不得也想吃一口。　攝影／TrangDoan"
  }
];

const NewsGroup = () => {
  const [data] = useState(MOCK_DATA);
  return (
    <>
      {data.map((item) => (
        <NewsItem item={item} />
      ))}
    </>
  );
};

export default NewsGroup;
