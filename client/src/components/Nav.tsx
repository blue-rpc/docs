import React from "react";
import { Link } from "react-router-dom";
import { SearchBox, useHits } from "react-instantsearch";
import SyncLoader from "react-spinners/SyncLoader";
import type { SearchBoxProps } from "react-instantsearch";
import { atom, useAtom } from "jotai";

export const scrollSearchedAtom = atom<null | string>("scroll-searched");

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Github } from "lucide-react";

const Nav = () => {
  const queryHook: SearchBoxProps["queryHook"] = (newQuery, search) => {
    search(newQuery);
  };

  return (
    <nav className="flex sticky top-0 left-0 z-50 items-center justify-between w-full p-4 h-[50px] lg:h-[75px] bg-[#0d1117] ">
      <div className="flex items-center space-x-8 relative">
        <Link to={"/"}>
          <img
            src={"/android-chrome-192x192.png"}
            width={32}
            height={32}
            alt="Bluerpc Logo"
          />
        </Link>
        <Dialog>
          <DialogTrigger>
            <input
              className="w-48 bg-transparent h-8 rounded-lg pl-4 border-[1px] border-stone-700 text-xs"
              placeholder="search docs"
            />
          </DialogTrigger>
          <DialogContent className="bg-stone-950 border-stone-800 outline-none overflow-hidden p-0 ">
            <DialogHeader className="flex flex-col ">
              <DialogTitle className="flex items-center border-stone-900 border-b-2 py-4 justify-center font-normal  align-middle">
                <SearchBox
                  // Optional props
                  queryHook={queryHook}
                  submitIconComponent={() => <></>}
                  resetIconComponent={() => <></>}
                  placeholder={"search docs"}
                  searchAsYouType={true}
                  className="w-full border-none"
                  classNames={{
                    reset: "!display-none",
                    resetIcon: "!display-none",
                    input: ` font-normal outline-none   transition-all duration-300 pl-4 border-none bg-transparent text-cyan-200 px-1 py-1 text-cyan-200`,
                  }}
                  // submitIconComponent={() => JSX.Element}
                  loadingIconComponent={() => <SyncLoader />}
                />
              </DialogTitle>
              <HitsComponent />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex items-center gap-x-4 justify-center align-middle">
        <Link
          className="text-cyan-200 bg-stone-900 hover:bg-stone-800 transition-all duration-300 flex items-center justify-center align-middle rounded-full p-1 w-8 h-8"
          to={"https://github.com/blue-rpc/bluerpc"}
        >
          <Github className=" w-4 h-4" />
        </Link>
        <Link
          className="text-cyan-200 bg-stone-900 hover:bg-stone-800 transition-all duration-300 flex items-center justify-center align-middle rounded-full p-1 w-8 h-8"
          to={"/documentation/get-started"}
        >
          <IconTextDocumentAlt className={"w-4 h-4 "} />
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
interface MarkdownSection {
  slug: string;
  section: string;
  content: string;
  [key: string]: string;
}

function HitsComponent() {
  const { hits } = useHits<MarkdownSection>();

  const [, setScrolled] = useAtom(scrollSearchedAtom);

  return (
    <div className=" shadow-md  outline-none w-full max-w-[100%] ">
      {hits.slice(0, 4).map((hit) => (
        <div
          key={hit.objectID}
          className="  p-2 text-white border-b-2 w-full border-stone-800 hover:bg-stone-900 transition-all relative duration-3001"
        >
          <img alt={"Algolia logo"} src={"/Algolia-mark-circle-blue.svg"} width={25} height={25} className="absolute pointer-events-none top-2 right-12" />
          <Link
            onClick={() =>
              setScrolled(
                hit.section.replace(" ", "").replace("(", "").replace(")", "")
              )
            }
            to={`/documentation/${hit.slug}#${hit.section
              .replace(" ", "")
              .replace("(", "")
              .replace(")", "")}`}
            className="flex flex-col gap-y-2 group ml-2 "
          >
            <p className="text-xs  text-slate-400">{hit.slug}</p>
            <p className=" text-cyan-200 text-lg  ">{hit.section}</p>
            <div className=" text-stone-300  line-clamp-1 group-hover:text-cyan-300 transition-all duration-300 truncate font-sans  overflow-ellipsis ">
              {hit.content.split(" ").length > 8 ? (
                <p>{`${
                  hit.content.split(" ").slice(0, 7).join(" ") + "..."
                }`}</p>
              ) : (
                <p>{hit.content}</p>
              )}
            </div>
          </Link>
        </div>
      ))}
      {hits.length > 5 && <p className="text-xl text-yellow-300 pl-4">...</p>}
    </div>
  );
}

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
