import { Footer } from "./Footer";
import { Header } from "./header/Header";

export const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
      <Footer />
    </div>
  );
};
