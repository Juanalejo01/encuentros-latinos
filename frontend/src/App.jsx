import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { EventosPage } from "./pages/EventosPage";
import { DetalleEventoPage } from "./pages/DetalleEventoPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { Layout } from "./components/general/Layout";
import { PaginaNoFound } from "./pages/PaginaNoFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/evento/:id" element={<DetalleEventoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<PaginaNoFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
