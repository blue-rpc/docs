import Sidebar from "@/components/documentation/Sidebar";
import useScreenSize from "@/hooks/useScreenSize";
import React, { RefObject, useState } from "react";

export enum docSection {
  GetStarted = "get-started",
  Intro = "introduction",
  App = "app",
  Router = "router",
  Procedures = "procedures",
  Context = "context",
  ClientSide = "client-side-integration",
}
const Index = () => {
  const screenSize = useScreenSize();
  const [sidebarVisible, toggleSidebar] = useState(screenSize.width > 1024);
  const [currentDocSection, setCurrentDocSection] = useState<docSection>(
    docSection.GetStarted
  );

  const [refs, setRefs] = useState<Record<string, RefObject<HTMLDivElement>>>(
    {}
  );
  return (
    <>
      <Sidebar
        refs={refs}
        setCurrentDocSection={setCurrentDocSection}
        sidebarVisibility={sidebarVisible}
      />
      <div className="w-full h-full"></div>
    </>
  );
};

export default Index;
