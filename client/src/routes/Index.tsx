import Github from "@/assets/icons/Github";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {


  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-white ">
        <h1 className="mt-4 text-5xl xl:max-w-[40vw] text-blue-400 mb-[4vh] lg:text-6xl xl:text-7xl text-center leading-tight  ">
          End To End <br></br> Go - Typescript <br></br> Type Safety
        </h1>
        <div className="flex flex-col items-center my-[4vh] justify-center w-full mb-12 align-middle lg:w-[60vw] lg:flex-row">
          <div className="w-[85%] lg:w-full border-2 border-[#FFD89E] aspect-video rounded-2xl " />
          <MobileConnector className="lg:hidden" />
          <DesktopConnector className="hidden lg:block" />
          <div className="w-[85%] lg:w-full border-2 border-[#FFD89E] aspect-video rounded-2xl " />
        </div>
        <h2 className="max-w-[80%] lg:max-w-[35%] mb-8 text-2xl text-yellow-100 text-center">
          Avoid mistakes and build apps faster by maintaining type safety
          between golang and typescript
        </h2>
        <div className="flex flex-col mb-4 gap-y-6 mt-[5vh]">
          <Button className="px-10 text-yellow-100 w-[60vw] lg:w-auto lg:text-xl text-lg  py-4 hover:bg-blue-900 transition-all duration-300 font-serif rounded-xl bg-blue-950 ">
            Get Started
          </Button>
          <Button
            className="px-10 text-yellow-100 w-[60vw] lg:w-auto lg:text-xl text-lg border-none py-4 hover:bg-blue-950 hover:text-white transition-all duration-300 font-serif bg-[#00161B] rounded-xl "
            variant="outline"
          >
            Documentation
          </Button>
          <Link
            className="text-center text-yellow-100 w-[60vw] lg:w-auto lg:text-xl gap-x-[2px] text-lg border-b-[1px] border-blue-900  flex items-center justify-center align-middle hover:border-blue-800"
            to={"/hello"}
          >
            <p>Give us a star on Github</p>

            <Github className="mb-1 text-blue-200" />
          </Link>
        </div>
    </div>
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
