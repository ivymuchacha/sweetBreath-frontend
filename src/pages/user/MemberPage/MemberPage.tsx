import { Container, PageTitle } from "./style";
import { Tabs, Tab } from "@/components";
import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getUser } from "@/webAPI/user";
import { getUserOrders } from "@/webAPI/order";
import { TabOrder, TabUser } from "./components";
import { useLoadingContext } from "@/context";
import { useTab } from "@/components/Tab/hook";
import { MemberUser } from "./interface";

enum TAB_INDEXES {
  userInfo = "個人資料",
  orderDetail = "消費紀錄"
}

const MemberPage = () => {
  const { setIsLoading } = useLoadingContext();
  const [user, setUser] = useState<MemberUser>();
  const [order, setOrder] = useState([]);

  const { activeTab, onTabClick } = useTab({
    tabIndexes: [TAB_INDEXES.userInfo, TAB_INDEXES.orderDetail],
    defaultActiveTab: TAB_INDEXES.userInfo
  });

  const fetchData = async () => {
    setIsLoading(true);
    const userRes = await getUser();
    if (!userRes.data) {
      setIsLoading(false);
      alert("請先登入");
      history.push("/login");
      return;
    }
    setUser(userRes.data);

    const orderRes = await getUserOrders(userRes.data.id);
    if (orderRes.data) {
      // console.log({
      //   orderData: orderRes.data
      // });
      setOrder(orderRes.data.reverse());
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const history = useHistory();

  return (
    <Container>
      <>
        <PageTitle>會員專區</PageTitle>
        <Tabs>
          <Tab
            active={activeTab === TAB_INDEXES.userInfo}
            onClick={() => onTabClick(TAB_INDEXES.userInfo)}>
            個人資料
          </Tab>
          <Tab
            active={activeTab === TAB_INDEXES.orderDetail}
            onClick={() => onTabClick(TAB_INDEXES.orderDetail)}>
            消費紀錄
          </Tab>
        </Tabs>
        <>
          {(() => {
            if (activeTab === TAB_INDEXES.userInfo)
              return <TabUser user={user} editable={!!user} />;

            if (activeTab === TAB_INDEXES.orderDetail)
              return <TabOrder order={order} orderItems={order.OrderItems} />;
          })()}
        </>
      </>
    </Container>
  );
};

export default MemberPage;
