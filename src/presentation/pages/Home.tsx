import React, { useState, lazy, Suspense } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

type TabComponents = {
  [key: string]: React.ComponentType<any>;
};

const tabComponents: TabComponents = {
  usuarios: lazy(() => import("../views/mantenedores/MUsuarios")),
  cargos: lazy(() => import("../views/mantenedores/MCargos")),
};

const tabNames = Object.keys(tabComponents);

const Home: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>(tabNames[0]);

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const renderTabContent = (tab: string) => {
    const LazyComponent = tabComponents[tab];
    return (
      <Suspense fallback={<div>Cargando...</div>}>
        <LazyComponent />
      </Suspense>
    );
  };

  return (
    <div className="mx-auto">
      <Tabs
        selectedIndex={tabNames.indexOf(currentTab)}
        onSelect={(index) => handleTabChange(tabNames[index])}
      >
        <TabList className="flex">
          {tabNames.map((tabName) => (
            <Tab key={tabName}>{tabName}</Tab>
          ))}
        </TabList>

        {tabNames.map((tabName) => (
          <TabPanel key={tabName}>{renderTabContent(tabName)}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default Home;
