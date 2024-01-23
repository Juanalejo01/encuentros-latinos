import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/general/Layout";
import { HomePage } from "./pages/HomePage";
import { EventosPage } from "./pages/EventosPage";
import { DetalleEventoPage } from "./pages/DetalleEventoPage";
import { RegisterPage } from "./pages/RegisterPage";
import { LoginPage } from "./pages/LoginPage";
import { PaginaNoFound } from "./pages/PaginaNoFound";
import { PrivateRoutes } from "./components/private/PrivateRoutes";
import { MisEventosPage } from "./pages/MisEventosPage";
import { CrearEventosPage } from "./pages/CrearEventosPage";
import { EditarEventosPage } from "./pages/EditarEventosPage";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/eventos" element={<EventosPage />} />
        <Route path="/evento/:id" element={<DetalleEventoPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/dashboard/eventos" element={<MisEventosPage />} />
          <Route path="/dashboard/evento" element={<CrearEventosPage />} />
          <Route path="/dashboard/evento/:id" element={<EditarEventosPage />} />
        </Route>
        <Route path="*" element={<PaginaNoFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
