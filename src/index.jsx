import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./screens/Company/App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import { LoginPage } from "./login";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
                <Route path="/" element={<Dashboard/>}/>
        {/* Default page → vessels */}
        <Route path="/vessel" element={<App />} />

        {/* General Ledger page */}
        <Route path="/general-ledger" element={<App />} />

        {/* Open Bill Request page */}
        <Route path="/openbillrequest" element={<App />} />
       <Route path="/login" element={<LoginPage />} />
        {/* Additional routes for vships */}
        {/* <Route path="/viships/openbillrequest" element={<App />} />
        <Route path="/vships/general-ledger" element={<App />} />
        <Route path="/vships/vessels" element={<App />} />
       */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
