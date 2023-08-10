import styled from "styled-components";
import { THEME } from "./theme";

export const MEDIA_QUERY = "@media screen and (max-width: 768px)";

export const H1 = styled.h1`
  font-size: ${THEME.fontSize.h1};
  font-weight: 500;
  line-height: 1.19;
`;

export const H2 = styled.h2`
  font-size: ${THEME.fontSize.h2};
  font-weight: 600;
  line-height: 1;
`;

export const H3 = styled.h3`
  font-size: ${THEME.fontSize.h3};
  font-weight: 500;
  line-height: 1.17;
`;

export const H4 = styled.h4`
  font-size: ${THEME.fontSize.h4};
  font-weight: 500;
  line-height: 1.22;
`;

export const H5 = styled.h5`
  font-size: ${THEME.fontSize.h5};
  font-weight: 500;
  line-height: 1.38;
`;

export const BodyLarge = styled.div`
  font-size: ${THEME.fontSize.bodyLarge};
  line-height: 1.5;
`;

export const Body = styled.div`
  font-size: ${THEME.fontSize.body};
  line-height: 1.43;
`;

export const Button = styled.button`
  font-size: ${THEME.fontSize.button};
  line-height: 1.21;
  font-weight: 500;
  text-align: center;
`;

export const Caption1 = styled.div`
  font-size: ${THEME.fontSize.caption1};
  line-height: 1.33;
`;

export const Caption2 = styled.div`
  font-size: ${THEME.fontSize.caption2};
  line-height: 1.33;
  font-weight: 600;
`;

export const Input = <
  Props extends Record<string, any> = any
>() => styled.input<Props>`
  margin: 20px 40px;
  padding: 12px;
  border-radius: 4px;
  border: solid 1px ${THEME.colors.neutralLightGrey};
  background-color: ${THEME.colors.neutralWhite};
  color: ${THEME.colors.neutralBlack};

  &:focus {
    border: solid 1px ${THEME.colors.mainPrimary};
  }

  &::placeholder {
    color: ${THEME.colors.neutralDarkGrey};
  }
`;

export const InputLine = styled.input`
  margin: 20px 40px;
  padding: 12px;
  border: none;
  border-bottom: solid 1px ${THEME.colors.neutralLightGrey};
  background-color: ${THEME.colors.neutralWhite};
  color: ${THEME.colors.neutralDarkGrey};

  &:focus {
    border-bottom: solid 1px ${THEME.colors.mainPrimary};
  }

  &::placeholder {
    color: ${THEME.colors.neutralDarkGrey};
  }
`;

export const Textarea = styled.textarea`
  margin: 20px 40px;
  padding: 12px;
  border: solid 1px ${THEME.colors.neutralLightGrey};
  background-color: ${THEME.colors.neutralWhite};
  color: ${THEME.colors.neutralDarkGrey};
  border-radius: 4px;
  &:focus {
    border-bottom: solid 1px ${THEME.colors.mainPrimary};
  }

  &::placeholder {
    color: ${THEME.colors.neutralDarkGrey};
  }
`;
