import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "../../css/private/private.css";

export const PrivateRoutes = ({ showSidebar }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(showSidebar);

  if (!token || token === " ") {
    return navigate("/");
  }

  return (
    <main className="layout__private">
      <Sidebar show={showSidebar} />
      <Outlet />
    </main>
  );
};
