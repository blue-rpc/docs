import Github from "@/assets/icons/Github";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {  SiGo } from "react-icons/si";
import { TbBrandTypescript } from "react-icons/tb";

const Index = () => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>BlueRPC : Homepage</title>
        <meta
          name="description"
          content="BlueRPC is a golang library that allows you to create type safe routes and in turn generate typescript API calls"
        />
      </Helmet>

      <div className="flex flex-col items-center justify-center w-full min-h-screen text-white ">
        <h1 className="mt-4 text-5xl xl:max-w-[40vw] text-cyan-400 mb-[4vh] lg:text-6xl xl:text-7xl text-center leading-tight  ">
          End To End <br></br> Go - Typescript <br></br> Type Safety
        </h1>
        <div className="flex flex-col items-center my-[4vh] justify-center w-full mb-12 align-middle lg:w-[80vw] lg:flex-row">
          <div className="w-full relative lg:w-full border-r-[1px] border-[#FFD89E] aspect-video  ">
            <div className="absolute flex items-center justify-center align-middle group top-0 left-2 w-6 h-6 rounded-b-lg bg-[#FFD89E]">
              <SiGo
                size={20}
                className="min-h-[20px] min-w-[20px]  text-black transition-all duration-300"
              />
            </div>
            <img src={"/bluerpc-go-gif-intro.gif"} className="object-fill" />
          </div>
          <MobileConnector className="lg:hidden" />
          <DesktopConnector className="hidden lg:block" />
          <div className="w-full relative lg:w-full border-l-[1px] border-[#FFD89E] aspect-video  ">
            <div className="absolute flex items-center justify-center align-middle group top-0 left-2 w-6 h-6 rounded-b-lg bg-[#FFD89E]">
              <TbBrandTypescript
                size={20}
                className="min-h-[20px] min-w-[20px]  text-black transition-all duration-300"
              />
            </div>
            <img src={"/bluerpc-ts-gif-intro.gif"} className="object-fill" />
          </div>
        </div>
        <h2 className="max-w-[80%] lg:max-w-[35%] mb-8 text-2xl text-yellow-100 text-center">
          Avoid mistakes and build apps faster by maintaining type safety
          between golang and typescript
        </h2>
        <div className="flex flex-col mb-4 gap-y-6 mt-[5vh] ">
          <Link
            to={"/documentation/get-started"}
            className="px-2  text-yellow-100  lg:text-xl text-xl  py-2 hover:bg-cyan-900 transition-all duration-300 text-center font-serif rounded-xl bg-cyan-950 "
          >
            Get Started
          </Link>

          <Link
            className="text-center text-yellow-100  lg:w-auto lg:text-xl gap-x-[2px] text-lg border-b-[1px] border-cyan-900  flex items-center justify-center align-middle hover:border-cyan-800 px-4"
            to={"https://github.com/blue-rpc/bluerpc"}
          >
            <p className="">Give us a star on Github</p>

            <Github className="mb-1 text-cyan-200" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Index;
function MobileConnector(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="13"
      height="22"
      viewBox="0 0 13 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M8 22H5V0H8V22Z" fill="#FFD89E" />
      <path d="M0 3V0H13V3H0Z" fill="#FFD89E" />
      <path d="M0 22V19H13V22H0Z" fill="#FFD89E" />
    </svg>
  );
}
function DesktopConnector(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="31"
      height="11"
      viewBox="0 0 31 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M30 4H3V7H30V4Z" fill="#FFD89E" />
      <path d="M3 0H0V11H3V0Z" fill="#FFD89E" />
      <path d="M31 0H28V11H31V0Z" fill="#FFD89E" />
    </svg>
  );
}
