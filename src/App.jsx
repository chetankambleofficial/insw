import React, { useState, useEffect } from "react";
import { Box, Stack } from "@mui/material";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FilterSection } from "./components/FilterSection/FilterSection";
import { HeaderSection } from "./components/HeaderSection/HeaderSection";
import { MainContentSection } from "./components/MainContentSection/MainContentSection";
import { VesselTableSection } from "./components/VesselTableSection/VesselTableSection";
import GeneralLedgerTable from "./components/GeneralLedger/GeneralLedgerTable";
import OpenBillRequestSection from "./components/OpenBillRequestSection/OpenBillRequestSection";

export const App = ({ section = "ae", page = "vessel" }) => {
  const location = useLocation();

  let activePage = page;
  if (location.pathname.includes("vessel")) activePage = "vessels";
  if (location.pathname.includes("general-ledger")) activePage = "general-ledger";
  if (location.pathname.includes("openbillrequest")) activePage = "openbillrequest";

  const [vessels, setVessels] = useState([]);
  const [generalLedger, setGeneralLedger] = useState([]);
  const [openBillRequest, setOpenBillRequest] = useState([]);

  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("All");

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [recordCount, setRecordCount] = useState(0);

  const [loadingData, setLoadingData] = useState(false);

  const baseURL = "http://localhost:8055/api";

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    setLoadingData(true);
    try {
      const [vesselsRes, glRes, obrRes] = await Promise.all([
        axios.get(`${baseURL}/vessels?section=${section}`),
        axios.get(`${baseURL}/general-ledger?section=${section}`),
        axios.get(`${baseURL}/openbillrequest?section=${section}`),
      ]);

      setVessels(vesselsRes.data);
      setGeneralLedger(glRes.data);
      setOpenBillRequest(obrRes.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [section]);

  /* ================= BUILD FILTER LIST ================= */
  useEffect(() => {
    let list = [];
    if (activePage === "vessels") list = vessels.map((v) => v.ACCOUNTING_COMPANY_NAME);
    if (activePage === "general-ledger") list = generalLedger.map((g) => g.documentNumber);
    if (activePage === "openbillrequest") list = openBillRequest.map((b) => b.vendorCompanyName);

    setCompanies(["All", ...new Set(list.filter(Boolean))]);
    setSelectedCompany("All");
  }, [activePage, vessels, generalLedger, openBillRequest]);

  /* ================= FILTERED DATA ================= */
  const filteredVessels = vessels.filter(
    (v) =>
      (selectedCompany === "All" || v.ACCOUNTING_COMPANY_NAME === selectedCompany) &&
      (searchQuery === "" || v.VESSEL_NAME?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredGL = generalLedger.filter((g) => {
    const matchesDocument = selectedCompany === "All" || g.documentNumber === selectedCompany;
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
    const matchesCompany = selectedCompany === "All" || b.vendorCompanyName === selectedCompany;
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

  /* ================= UPLOAD HANDLER ================= */
  const handleUpload = async (file) => {
    console.log(`Uploading for ${section}:`, file.name);
    // implement actual upload logic here, e.g., axios POST
    await fetchData(); // optionally refresh after upload
  };

  return (
    <Box sx={{ bgcolor: "#f2f4f7", minHeight: "100vh" }}>
      <HeaderSection section={section} />

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
            recordCount={recordCount}
            filteredData={
              activePage === "vessels"
                ? filteredVessels
                : activePage === "general-ledger"
                  ? filteredGL
                  : filteredOBR
            }
          />

        </LocalizationProvider>

        <Stack sx={{ width: "100%" }}>
          <MainContentSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            recordCount={recordCount}
            onUploadExcel={handleUpload}
            onRefresh={fetchData} // refresh API
          />

          {activePage === "vessels" && (
            <VesselTableSection vessels={filteredVessels} loading={loadingData} />
          )}
          {activePage === "general-ledger" && (
            <GeneralLedgerTable data={filteredGL} loading={loadingData} />
          )}
          {activePage === "openbillrequest" && (
            <OpenBillRequestSection data={filteredOBR} loading={loadingData} />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
