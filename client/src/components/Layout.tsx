import "@/styles/app.css";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import { Toaster } from "./ui/toaster";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch } from "react-instantsearch";

console.log("d", import.meta.env.VITE_ALGOLIA_APPLICATION_ID);
console.log("e", import.meta.env.VITE_ALGOLIA_SEARCH_ONLY_API_KEY);

const ALGOLIA_APPLICATION_ID = import.meta.env.VITE_ALGOLIA_APPLICATION_ID;
const ALGOLIA_SEARCH_ONLY_API_KEY = import.meta.env
  .VITE_ALGOLIA_SEARCH_ONLY_API_KEY;
const searchClient = algoliasearch(
  ALGOLIA_APPLICATION_ID,
  ALGOLIA_SEARCH_ONLY_API_KEY
);

const Layout = () => {
  return (
    <>
      <InstantSearch searchClient={searchClient} indexName="bluerpc_docs">
        <Nav />

        <main className="min-h-screen min-w-screen">
          <Outlet />
        </main>

        <Toaster />
      </InstantSearch>
    </>
  );
};

export default Layout;
