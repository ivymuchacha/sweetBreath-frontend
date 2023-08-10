import styled from "styled-components";
import { H1, MEDIA_QUERY, Input } from "@/constants/style";
import { THEME } from "@/constants/theme";
import { AnyObject } from "@/interface";

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }

  max-width: 1000px;
  margin: 40px auto;
  padding: 0 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: ${() => THEME.fontSize.h4};

  ${MEDIA_QUERY} {
    padding: 0 20px;
  }
`;

export const PageTitle = styled(H1)`
  margin-bottom: 40px;
`;

export const TabUserGroup = styled.form`
  width: 100%;
  padding: 30px 0 0 0;
  margin-left: 10px;
  display: column;
`;

export const TabUserItem = styled.div<{ editable: boolean }>`
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  width: 65%;
  padding: 8px 0;
  display: grid;
  grid-template-columns: 20% 40% 40%;
  align-items: center;
  :hover {
    background: ${(props) =>
      props.editable ? THEME.colors.neutralLightGrey : ""};
  }
  ${MEDIA_QUERY} {
    width: 100%;
  }
`;

export const TabUserItemTitle = styled.div`
  padding-left: 10px;
`;

export const TabUserItemValue = styled.div``;

export const TabUserItemValueNew = styled(Input<{ editable: boolean }>())`
  color: ${THEME.colors.neutralBlack};
  font-size: ${THEME.fontSize.bodyLarge};
  border-bottom: 1px solid ${THEME.colors.neutralLightGrey};
  padding: 8px;
  margin: 0 10px;
  visibility: ${(props) => (props.editable ? "" : "hidden")};
`;

export const EditButtonBlock = styled.div`
  width: 65%;
  padding-right: 10px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 10px;
`;

export const EditButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 4px;
  background: ${THEME.colors.mainPrimary};
  font-size: ${THEME.fontSize.h5};
  color: #ffffff;
  cursor: pointer;
  :hover {
    background: ${THEME.colors.uiNegative};
  }
`;

export const Message = styled.div`
  color: ${THEME.colors.mainPrimary};
  margin: 0 20px 0 0;
  align-items: center;
`;

export const TabOrderGroup = styled.div`
  width: 100%;
  padding: 30px 0 0 0;
  display: column;
`;

export const TabOrderItem = styled.div`
  width: 66%;
  border: 3px solid ${THEME.colors.neutralLightGrey};
  padding: 30px;
  line-height: 30px;
  font-size: ${THEME.fontSize.h4};

  :hover {
    border: 3px solid ${THEME.colors.mainPrimary};

    #totalPrize {
      background: ${THEME.colors.mainSecondary};
    }
  }
  ${MEDIA_QUERY} {
    width: 100%;
  }
`;

export const TabOrderTop = styled.div`
  border-bottom: 3px solid ${THEME.colors.neutralPaleGrey};
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export const TabOrderCenter = styled.div`
  border-bottom: 1px solid ${THEME.colors.neutralPaleGrey};
  margin-bottom: 10px;
  padding-bottom: 10px;
`;

export const TabOrderProductTitle = styled.div`
  margin-bottom: 10px;
`;

export const TabOrderProduct = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  a {
    color: ${THEME.colors.neutralBlack};

    :hover {
      border-bottom: 1px solid ${THEME.colors.neutralBlack};
    }
  }
`;

export const TabOrderProductImg = styled.div`
  img {
    width: 130px;
    height: 130px;
    border-radius: 4px;
  }
`;

export const TabOrderProductTotal = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TabOrderBottom = styled.div``;

export const OrderStatus = styled.div`
  display: flex;
  align-items: center;
`;

export const OrderStatusLabel = <
  Props extends AnyObject
>() => styled.button<Props>`
  background: ${THEME.colors.neutralGrey};
  font-size: ${THEME.fontSize.bodyLarge};
  color: ${THEME.colors.neutralWhite};
  border-radius: 4px;
  padding: 6px;
  margin: 4px;
  cursor: pointer;

  ${MEDIA_QUERY} {
    font-size: ${THEME.fontSize.bodyLarge};
  }
`;

export const IsDoneLabel = styled(
  OrderStatusLabel<{ isCancel: boolean; isDone: boolean }>()
)`
  ${(props) =>
    (props.isCancel && `background: ${THEME.colors.uiNegative}`) ||
    (props.isDone
      ? `background: ${THEME.colors.uiPositive}`
      : `background: ${THEME.colors.uiWarning}`)}
`;

export const IsPaidLabel = styled(OrderStatusLabel<{ isPaid: boolean }>())`
  ${(props) => props.isPaid && `background: ${THEME.colors.uiPositive}`}
`;

export const IsSentLabel = styled(OrderStatusLabel<{ isSent: boolean }>())`
  ${(props) => props.isSent && `background: ${THEME.colors.uiPositive}`}
`;
