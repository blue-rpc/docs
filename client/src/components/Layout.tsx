import "@/styles/app.css";
import Nav from "./Nav";
import { Outlet } from "react-router-dom";
const Layout = () => {
  return (
    <>
      <Nav />
      <main className="min-h-screen min-w-screen"><Outlet /></main>
    </>
  );
};

export default Layout;
