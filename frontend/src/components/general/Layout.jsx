import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({
  children,
  showSidebar,
  setShowSidebar,
  setTematicaHeader,
  setCiudadHeader,
}) => {
  return (
    <div className="layout">
      <Header
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        setTematicaHeader={setTematicaHeader}
        setCiudadHeader={setCiudadHeader}
      />
      {children}
      <Footer />
    </div>
  );
};
