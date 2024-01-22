import DocumentationMain from "@/components/documentation/DocumentationMain";
import Sidebar from "@/components/documentation/Sidebar";
import { PageLayout, docSection } from "@/constants/documentation";
import useScreenSize from "@/hooks/useScreenSize";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLoaderData } from 'react-router-dom';


const allowedSlugs = Object.values(docSection); // Array of allowed slugs

const Index = () => {
  const navigate = useNavigate();

  const { slug } = useParams() as { slug: docSection }; // Extract slug from URL
  useEffect(() => {
    // Check if the slug is valid
    if (slug && allowedSlugs.includes(slug as docSection)) return;
    navigate(`/404`);
  }, []);

  const screenSize = useScreenSize();
  const [sidebarVisible, toggleSidebar] = useState(screenSize.width > 1024);
  const layout = useLoaderData() as PageLayout;

  // useEffect(() => {
  //   console.log("layout", layout);
    
  // }, [layout])
  
  return (
    <div className="flex relative">
      <Sidebar sidebarVisibility={sidebarVisible} toggleSidebar={toggleSidebar} />
      <div className={`${sidebarVisible ? "" : " -translate-x-[300px]"  } ml-[50px] transition-all duration-300`}>
      <DocumentationMain  layout={layout} slug={slug} />
      </div>
    </div>
  );
};

export default Index;

