import React from "react";
import exampleImage from "../assets/bluerpc-logo.png";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between w-full p-4 h-[50px] lg:h-[75px] bg-[#0d1117] ">
      <div className="flex items-center space-x-2">
        <img src={exampleImage} alt="Bluerpc Logo" />
        <div className="flex items-center border-b gap-x-2 border-blue-950 text-stone-400">
          <IconSearch className="w-4 h-4 " />
          <input
            className="p-1 text-white bg-transparent max-w-[35vw] focus:!border-none focus:!outline-none"
            placeholder="search..."
            type="search"
          />
        </div>
      </div>
      <div>
        <Link to={"/documentation"}>
          <IconTextDocumentAlt className={"w-6 h-8 text-stone-400 "} />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;

function IconTextDocumentAlt(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="#fff" viewBox="0 0 15 15" height="12px" width="12px" {...props}>
      <path
        fill="currentColor"
        d="M4.5 6.995H4v1h.5v-1zm6 1h.5v-1h-.5v1zM4.5 10H4v1h.5v-1zm6 1h.5v-1h-.5v1zm-6-7.003H4v1h.5v-1zm6 1h.5v-1h-.5v1zm3-1.497h.5v-.207l-.146-.147-.354.354zm-3-3l.354-.354L10.707 0H10.5v.5zm-6 7.495h6v-1h-6v1zM4.5 11h6v-1h-6v1zm0-6.003h6v-1h-6v1zm8 9.003h-10v1h10v-1zM2 13.5v-12H1v12h1zm11-10v10h1v-10h-1zM2.5 1h8V0h-8v1zm7.646-.146l3 3 .708-.708-3-3-.708.708zM2.5 14a.5.5 0 01-.5-.5H1A1.5 1.5 0 002.5 15v-1zm10 1a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zM2 1.5a.5.5 0 01.5-.5V0A1.5 1.5 0 001 1.5h1z"
      />
    </svg>
  );
}

function IconSearch(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M11.742 10.344a6.5 6.5 0 10-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 001.415-1.414l-3.85-3.85a1.007 1.007 0 00-.115-.1zM12 6.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" />
    </svg>
  );
}
