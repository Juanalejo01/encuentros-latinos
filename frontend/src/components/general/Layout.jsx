import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout = ({ children, showSidebar, setShowSidebar }) => {
  return (
    <div className="layout">
      <Header showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      {children}
      <Footer />
    </div>
  );
};
