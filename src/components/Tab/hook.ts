import { useState } from "react";

interface UseTabProps<TabIndex extends string = string> {
  tabIndexes: TabIndex[];
  defaultActiveTab?: TabIndex;
}

export const useTab = <TabIndex extends string = string>({
  tabIndexes,
  defaultActiveTab
}: UseTabProps<TabIndex>) => {
  const [activeTab, setActiveTab] = useState<TabIndex>(
    defaultActiveTab ?? tabIndexes[0]
  );

  return {
    activeTab,
    onTabClick: (tabIndex: TabIndex) => setActiveTab(tabIndex)
  };
};
