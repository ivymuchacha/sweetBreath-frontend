import styled from "styled-components";
import { THEME } from "@/constants/theme";

export const Tabs = styled.div`
  overflow: hidden;
  background: ${THEME.colors.neutralWhite};
  height: 3em;
`;

const Tab = styled.button`
  border: none;
  outline: none;
  width: 33%;
  position: relative;

  font-size: 1em;
  height: "3em;";
  transition: background-color 0.5s ease-in-out;
`;

export const ActiveTab = styled(Tab)`
  cursor: default;
  color: ${THEME.colors.neutralWhite};
  background-color: ${THEME.colors.mainPrimary};
  border-bottom: ${`2px solid ${THEME.colors.mainPrimary}`};
`;

export const InactiveTab = styled(Tab)`
  cursor: pointer;
  background-color: ${THEME.colors.neutralGrey};
  border-bottom: ${`2px solid ${THEME.colors.neutralGrey}`};
`;
