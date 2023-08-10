import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { setAuthToken } from "@/utils/authToken";
import logout from "../icon/logout.png";
import {
  NavbarContent,
  FunctionBar,
  Divider,
  LogoutButton,
  Logo,
  NavButton
} from "./style";
import { useAuthContext } from "../../context";

export default function AdminNavbar() {
  const location = useLocation();
  const history = useHistory();
  const { setUser } = useAuthContext();
  const handleLogout = () => {
    setAuthToken("");
    setUser(null);
    if (location.pathname !== "/") {
      history.push("/");
    }
  };

  return (
    <NavbarContent id='top'>
      <Logo />
      <FunctionBar>
        <NavButton route='/news' title={"最新消息"} />
        <NavButton route='/products' title={"商品"} />
        <NavButton route='/about' title={"關於我們"} />
        <NavButton route='/contact' title={"聯絡我們"} />
      </FunctionBar>
      <FunctionBar>
        <Divider>|</Divider>
        <NavButton route='/admin/products' title={"商品管理"} />
        <NavButton route='/admin/category' title={"分類管理"} />
        <NavButton route='/admin/member' title={"權限管理"} />
        <NavButton route='/admin/orders' title={"訂單管理"} />
        <LogoutButton onClick={handleLogout}>
          <img src={logout} alt='logout' />
        </LogoutButton>
      </FunctionBar>
    </NavbarContent>
  );
}
