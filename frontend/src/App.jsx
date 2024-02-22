import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
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
import { ActualizarUsuarios } from "./pages/ActualizarUsuarioPage";
import { MisSuscripcionesPage } from "./pages/MisSuscripcionesPage";
import { useState } from "react";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [tematicaHeader, setTematicaHeader] = useState("");
  const [ciudadHeader, setCiudadHeader] = useState("");

  return (
    <Layout
      showSidebar={showSidebar}
      setShowSidebar={setShowSidebar}
      setTematicaHeader={setTematicaHeader}
      setCiudadHeader={setCiudadHeader}
    >
      <Toaster position="top-center" richColors />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/eventos"
          element={<EventosPage tematicaHeader={tematicaHeader} ciudadHeader={ciudadHeader} />}
        />
        <Route path="/evento/:id" element={<DetalleEventoPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={<PrivateRoutes showSidebar={showSidebar} setShowSidebar={setShowSidebar} />}
        >
          <Route path="/dashboard/eventos" element={<MisEventosPage />} />
          <Route path="/dashboard/suscripciones" element={<MisSuscripcionesPage />} />
          <Route path="/dashboard/evento" element={<CrearEventosPage />} />
          <Route path="/dashboard/evento/:id" element={<EditarEventosPage />} />
          <Route path="/dashboard/configuracion" element={<ActualizarUsuarios />} />
        </Route>
        <Route path="*" element={<PaginaNoFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
