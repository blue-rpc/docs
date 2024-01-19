import React, { useCallback, useMemo, useRef } from "react";
import { useSpring, animated, config } from "@react-spring/web";
import { docSection } from "@/routes/documentation/Index";
import { Button } from "../ui/button";
import { Start } from "@/assets/icons/ArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { InfoIcon } from "lucide-react";

const Sidebar = ({
  sidebarVisibility,
  refs,
  setCurrentDocSection,
}: {
  sidebarVisibility: boolean;
  refs: Record<string, React.RefObject<HTMLDivElement>>;
  setCurrentDocSection: React.Dispatch<React.SetStateAction<docSection>>;
}) => {
  const displayedRows: {
    Icon: JSX.Element;
    text: string;
    targetPage: docSection;
    targetSection: null | React.RefObject<HTMLDivElement>;
  }[] = useMemo(
    () => [
      {
        Icon: <Start className="w-4 h-4 text-orange-400" />,
        text: "Get Started",
        targetPage: docSection.GetStarted,
        targetSection: null,
      },
      {
        Icon: <InfoIcon className="w-4 h-4 text-orange-400" />,
        text: "Get Started",
        targetPage: docSection.Intro,
        targetSection: null,
      },
    ],
    [refs]
  );

  const springs = useSpring({
    from: { transform: "translateX(0%)" }, // Start from -100%
    to: { transform: `translateX(${sidebarVisibility ? "0%" : "-100%"})` }, // End at 0% if visible, else -100%
    config : config.stiff
  });

  return (
    <animated.section
      style={springs}
      className={
        "h-full pl-12 w-[300px] bg-[#101335] -translate-y-[50px] lg:-translate-y-[75px] flex flex-col"
      }
    >
      {displayedRows.map((rowInfo) => (
        <Row
          Icon={rowInfo.Icon}
          text={rowInfo.text}
          setCurrentDocSection={setCurrentDocSection}
          targetPage={rowInfo.targetPage}
          targetSectionRef={rowInfo.targetSection}
        />
      ))}
    </animated.section>
  );
};

export default Sidebar;
type rowProps = {
  Icon: JSX.Element;
  text: string;
  targetPage: docSection;
  setCurrentDocSection: React.Dispatch<React.SetStateAction<docSection>>;
  targetSectionRef: React.RefObject<HTMLDivElement> | null;
};
const Row = ({
  Icon,
  targetSectionRef,
  targetPage,
  setCurrentDocSection,
  text,
}: rowProps) => {
  const onClick = useCallback(() => {
    setCurrentDocSection(targetPage);
    if (!targetSectionRef || !targetSectionRef.current) return;
    targetSectionRef.current.scrollTo();
  }, [targetPage, targetSectionRef]);
  return (
    <Button
      onClick={onClick}
      className="flex justify-start flex-grow-0 w-3/4 text-2xl transition-all duration-300 bg-transparent border-l-2 border-transparent rounded-none group hover:bg-transparent gap-x-4"
    >
      {Icon}
      <p className="text-xs transition-all duration-300 text-stone-200 lg:text-lg group-hover:text-blue-300 "> {text}</p>

    </Button>
  );
};
