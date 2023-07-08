import React from "react";
import sweetBreath from "../icon/sweetBreath_line.png";
import {
  LogoContent,
  LogoImg,
  ButtonContent,
  ButtonText,
  IconContent,
  IconImg,
  InstagramImg
} from "./style";
import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <LogoContent>
      <Link to={"/"}>
        <LogoImg src={sweetBreath} alt='logo' />
      </Link>
    </LogoContent>
  );
};

interface NavButtonProps {
  route: string;
  title: string;
}
export const NavButton = (props: NavButtonProps) => {
  return (
    <ButtonContent to={props.route}>
      <ButtonText>{props.title}</ButtonText>
    </ButtonContent>
  );
};

interface IconButtonProps {
  route: string;
  icon?: string;
}
export const IconButton = (props: IconButtonProps) => {
  return (
    <IconContent to={props.route}>
      <IconImg src={props.icon} />
    </IconContent>
  );
};

export const InstagramButton = (props: IconButtonProps) => {
  return (
    <IconContent to={props.route}>
      <InstagramImg src={props.icon} />
    </IconContent>
  );
};
