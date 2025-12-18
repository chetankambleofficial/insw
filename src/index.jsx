import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LoginPage } from "./login";
import { App } from "./screens/Company/App";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Anglo Eastern (lowercase 'ae') */}
        <Route path="/ae/vessel" element={<App section="ae" page="vessel" />} />
        <Route path="/ae/general-ledger" element={<App section="ae" page="general-ledger" />} />
        <Route path="/ae/openbillrequest" element={<App section="ae" page="openbillrequest" />} />

        {/* VShips (lowercase 'vships') */}
        <Route path="/vships/vessel" element={<App section="vships" page="vessel" />} />
        <Route path="/vships/general-ledger" element={<App section="vships" page="general-ledger" />} />
        <Route path="/vships/openbillrequest" element={<App section="vships" page="openbillrequest" />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
