import { useState } from "react";
import { NewsDetail } from "./interface";
import {
  NewsItemBlock,
  NewsItemImg,
  NewsItemInfo,
  NewsItemInfoTop,
  BriefDesc,
  FullDesc
} from "./style";
import { H3 } from "@/constants/style";

interface NewsItemProps {
  item: NewsDetail;
}

const NewsItem = ({ item }: NewsItemProps) => {
  const [isCollapse, setIsCollapse] = useState(true);

  return (
    <NewsItemBlock
      key={item.itemId}
      onClick={() => {
        setIsCollapse(!isCollapse);
      }}>
      <NewsItemImg>
        <img src={item.src} alt={item.itemTitle} />
      </NewsItemImg>
      <NewsItemInfo>
        <NewsItemInfoTop>
          <H3>{item.itemTitle}</H3>
          <div>{item.itemTime}</div>
        </NewsItemInfoTop>
        <div>
          {isCollapse ? (
            <BriefDesc>{item.itemDesc}</BriefDesc>
          ) : (
            <FullDesc>{item.itemDesc}</FullDesc>
          )}
        </div>
      </NewsItemInfo>
    </NewsItemBlock>
  );
};

export default NewsItem;
