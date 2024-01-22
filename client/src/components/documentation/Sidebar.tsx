import React, { useCallback } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { Button } from "../ui/button";
import { Start } from "@/assets/icons/ArrowRight";
import { Router, Menu, Tv2, Phone, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { docSection } from "@/constants/documentation";
import { SiTypescript } from "react-icons/si";
import { SiJavascript } from "react-icons/si";


const displayedRows: {
  Icon: JSX.Element;
  value: docSection;
  label : string
}[] = [
  {
    Icon: <Start className="w-6 h-6 text-orange-400 group-hover:text-orange-200 transition-all duration-300" />,
    value :docSection.GetStarted,
    label : "Get Started"
  },
  {
    Icon: <Tv2 className="w-6 h-6 text-orange-400 group-hover:text-orange-200 transition-all duration-300" />,
    value :docSection.App,
    label : "App"
  },
  {
    Icon: <Router className="w-6 h-6 text-cyan-500 group-hover:text-cyan-300 transition-all duration-300" />,
    value :docSection.Router,
    label : "Router"
  },
  {
    Icon: <Phone className="w-6 h-6 text-cyan-500 group-hover:text-cyan-300 transition-all duration-300" />,
    value :docSection.Procedures,
    label : "Procedure"
  },
  {
    Icon: <Brain className="w-6 h-6 text-cyan-500 group-hover:text-cyan-300 transition-all duration-300" />,
    value :docSection.Context,
    label : "Context"
  },
  {
    Icon: <SiTypescript size={24}  className="min-h-[24px] min-w-[24px] text-cyan-500 group-hover:text-cyan-300 transition-all duration-300" />,
    value :docSection.TypeGeneration,
    label : "Type Generation"
  },
  {
    Icon: <SiJavascript  size={24}  className="min-h-[24px] min-w-[24px] text-cyan-500 group-hover:text-cyan-300 transition-all duration-300" />,
    value :docSection.ClientSide,
    label : "Client Side Integration"
  },
];


const Sidebar = ({
  sidebarVisibility,
  toggleSidebar
}: {
  sidebarVisibility: boolean;
  toggleSidebar : React.Dispatch<React.SetStateAction<boolean>>
}) => {

  const navigate = useNavigate();

  const handleButtonClick = useCallback(
    (section : docSection) => {
      navigate(`/documentation/${section}`);
    },
    [],
  )
  
  const springs = useSpring({
    from: { transform: "translateX(0%)" }, // Start from -100%
    to: { transform: `translateX(${sidebarVisibility ? "0%" : "-100%"})` }, // End at 0% if visible, else -100%
    config : config.default
  });

  return (
    <animated.section
      style={springs}
      className={
        "h-full pt-6 shadow-md shadow-stone-900 sticky top-[75px] left-0 min-h-screen pl-6 w-[300px] bg-[#04161A] -translate-y-[50px] lg:-translate-y-[75px] flex flex-col"
      }
    >
      <Button
      onClick={()=> toggleSidebar((v)=> !v)}
      className="absolute bg-transparent border-2 border-cyan-900 transition-all duration-300 hover:border-cyan-200 top-0 right-0 translate-x-[100%]  w-[30px] h-[30px] p-1 rounded-full"
      >
        <Menu/>
      </Button>
      {displayedRows.map((rowInfo) => (
        <Row
          Icon={rowInfo.Icon}
          value={rowInfo.value}
          key={rowInfo.value}
          label={rowInfo.label}
          handleButtonClick={handleButtonClick}
        />
      ))}
    </animated.section>
  );
};

export default Sidebar;
type rowProps = {
  Icon: JSX.Element;
  value: docSection;
  label: string
  handleButtonClick: (value: docSection)=> void
};
const Row = ({
  Icon,
  value,
  label,
  handleButtonClick
}: rowProps) => {
  return (
    <Button
      onClick={()=> handleButtonClick(value)}
      className="flex  justify-start flex-grow-0 w-3/4 text-2xl transition-all duration-300 bg-transparent border-l-2 border-transparent rounded-none group hover:bg-transparent gap-x-4"
    >
      {Icon}
      <p className="text-xs font-serif transition-all duration-300 text-stone-200 lg:text-lg group-hover:text-cyan-200 "> {label}</p>

    </Button>
  );
};
