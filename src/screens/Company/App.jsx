import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { FilterSection } from "./sections/FilterSection/FilterSection";
import { HeaderSection } from "./sections/HeaderSection/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection/MainContentSection";
import { VesselTableSection } from "./sections/VesselTableSection/VesselTableSection";
import GeneralLedgerTable from "./sections/GeneralLedger/GeneralLedgerTable";
import OpenBillRequestSection from "./sections/OpenBillRequestSection/OpenBillRequestSection";

import { exportToExcel } from "../../utils/exportToExcel";

export const App = () => {
  const location = useLocation();
const navigate = useNavigate();
  let activePage = location.pathname.replace("/", "") || "vessels";
  if (activePage === "vessel") activePage = "vessels";

  const [vessels, setVessels] = useState([]);
  const [generalLedger, setGeneralLedger] = useState([]);
  const [openBillRequest, setOpenBillRequest] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("All");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [recordCount, setRecordCount] = useState(0);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    axios.get("http://localhost:8055/api/vessels").then((r) => setVessels(r.data));
    axios
      .get("http://localhost:8055/api/general-ledger")
      .then((r) => setGeneralLedger(r.data));
    axios
      .get("http://localhost:8055/api/openbillrequest")
      .then((r) => setOpenBillRequest(r.data));
  }, []);

  /* ================= BUILD FILTER LIST ================= */
  useEffect(() => {
    let list = [];

    if (activePage === "vessels") {
      list = vessels.map((v) => v.ACCOUNTING_COMPANY_NAME);
    }

    if (activePage === "general-ledger") {
      list = generalLedger.map((g) => g.documentNumber);
    }

    if (activePage === "openbillrequest") {
      list = openBillRequest.map((b) => b.vendorCompanyName);
    }

    setCompanies(["All", ...new Set(list.filter(Boolean))]);
    setSelectedCompany("All");
  }, [activePage, vessels, generalLedger, openBillRequest]);

  /* ================= FILTERED DATA ================= */

  const filteredVessels = vessels.filter(
    (v) =>
      (selectedCompany === "All" ||
        v.ACCOUNTING_COMPANY_NAME === selectedCompany) &&
      (searchQuery === "" ||
        v.VESSEL_NAME?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGL = generalLedger.filter((g) => {
    const matchesDocument =
      selectedCompany === "All" || g.documentNumber === selectedCompany;

    const matchesDate =
      !startDate ||
      !endDate ||
      (new Date(g.transactionDate) >= new Date(startDate) &&
        new Date(g.transactionDate) <= new Date(endDate));

    const matchesSearch =
      searchQuery === "" ||
      g.documentNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.accountingNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.memo?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDocument && matchesDate && matchesSearch;
  });

  const filteredOBR = openBillRequest.filter((b) => {
    const matchesCompany =
      selectedCompany === "All" ||
      b.vendorCompanyName === selectedCompany;

    const matchesDate =
      !startDate ||
      !endDate ||
      (new Date(b.invoiceDate) >= new Date(startDate) &&
        new Date(b.invoiceDate) <= new Date(endDate));

    const matchesSearch =
      searchQuery === "" ||
      b.vendorCompanyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCompany && matchesDate && matchesSearch;
  });

  /* ================= RECORD COUNT ================= */
  useEffect(() => {
    if (activePage === "vessels") setRecordCount(filteredVessels.length);
    if (activePage === "general-ledger") setRecordCount(filteredGL.length);
    if (activePage === "openbillrequest") setRecordCount(filteredOBR.length);
  }, [filteredVessels, filteredGL, filteredOBR, activePage]);

  /* ================= EXPORT ================= */
const handleUpload = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // axios.post("/api/upload-excel", formData)
  console.log("Uploading:", file.name);
};


  return (
    <Box sx={{ bgcolor: "#f2f4f7", minHeight: "100vh" }}>
      <HeaderSection />

      <Stack direction="row">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <FilterSection
            companies={companies}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </LocalizationProvider>

        <Stack sx={{ width: "100%" }}>
          <MainContentSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            recordCount={recordCount}
            onUploadExcel={handleUpload}
          />

          {activePage === "vessels" && (
            <VesselTableSection vessels={filteredVessels} />
          )}

          {activePage === "general-ledger" && (
            <GeneralLedgerTable data={filteredGL} />
          )}

          {activePage === "openbillrequest" && (
            <OpenBillRequestSection data={filteredOBR} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
