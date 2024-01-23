import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const PrivateRoutes = () => {
  return (
    <>
      {" "}
      <Sidebar />
      <Outlet />
    </>
  );
};
