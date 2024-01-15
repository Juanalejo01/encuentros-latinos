import { Footer } from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/eventos"
          element={<p>Listado de eventos ordenados por numero de inscritos</p>}
        />
        <Route path="/evento/:id" element={<p>Detalle de cada evento</p>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
