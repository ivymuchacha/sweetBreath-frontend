import { ActiveTab, InactiveTab } from "./style";

interface TabProps {
  active: boolean;
  children?: React.ReactNode;
  onClick: () => void;
}

export const Tab = (props: TabProps) => {
  if (typeof props === "string") return props;
  const { active, ...restProps } = props;
  return active ? <ActiveTab {...restProps} /> : <InactiveTab {...restProps} />;
};
