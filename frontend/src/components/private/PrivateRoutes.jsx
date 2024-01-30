import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export const PrivateRoutes = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!token || token === " ") {
    return navigate("/");
  }

  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};
