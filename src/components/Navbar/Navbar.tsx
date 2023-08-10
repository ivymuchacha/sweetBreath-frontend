import React, { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import member from "../icon/member.png";
import cart from "../icon/cart.png";
import magnifying from "../icon/magnifying.png";
import facebook from "../icon/facebook.png";
import instagram from "../icon/instagram.png";
import logout from "../icon/logout.png";
import { setAuthToken } from "@/utils/authToken";
import { Logo, NavButton, IconButton, InstagramButton } from "./button";
import {
  NavbarContent,
  FunctionBar,
  IconBar,
  LogOutButton,
  IconContent,
  LogOutImg,
  LoadingGetMe
} from "./style";
import { useAuthContext, useLoadingContext } from "../../context/hooks";

export default function Navbar() {
  const location = useLocation();
  const history = useHistory();
  const { isLoadingGetMe } = useLoadingContext();
  const { user, setUser } = useAuthContext();
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
      <IconBar>
        <IconButton route='/products' icon={magnifying} />
        <IconButton route='/contact' icon={facebook} />
        <InstagramButton route='/contact' icon={instagram} />
      </IconBar>
      <IconBar>
        <IconButton route='/cart' icon={cart} />
        {isLoadingGetMe ? (
          <LoadingGetMe>資料驗證中...</LoadingGetMe>
        ) : (
          <>
            {user ? (
              <IconButton route='/member' icon={member} />
            ) : (
              <IconButton route='/login' icon={member} />
            )}
            {user && (
              <LogOutButton onClick={handleLogout}>
                <IconContent to=''>
                  <LogOutImg src={logout} />
                </IconContent>
              </LogOutButton>
            )}
          </>
        )}
      </IconBar>
    </NavbarContent>
  );
}
