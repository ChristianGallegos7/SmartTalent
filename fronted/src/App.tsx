import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PaginaLogin from "./components/LoginPage";
import PanelAdmin from "./components/admin/PanelAdmin";
import PanelCandidato from "./components/candidato/PanelCandidato";
import RutaProtegida from "./components/RutaProtegida";

export default function Aplicacion() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PaginaLogin />} />
        <Route
          path="/admin"
          element={
            <RutaProtegida rol="admin">
              <PanelAdmin />
            </RutaProtegida>
          }
        />
        <Route
          path="/candidato"
          element={
            <RutaProtegida rol="candidato">
              <PanelCandidato />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
