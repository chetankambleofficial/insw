import React, { useState, useMemo } from "react";
import { Box, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HeaderSection } from "./components/HeaderSection/HeaderSection";
import { FilterSection } from "./components/FilterSection/FilterSection";
import { MainContentSection } from "./components/MainContentSection/MainContentSection";
import { VesselTableSection } from "./components/VesselTableSection/VesselTableSection";
import GeneralLedgerTable from "./components/GeneralLedger/GeneralLedgerTable";
import OpenBillRequestSection from "./components/OpenBillRequestSection/OpenBillRequestSection";
import { useDashboardData } from "./hooks/useDashBoardData";
import { usePageResolver } from "./hooks/usePageResolver";
import { filterDataByPage } from "./utils/filterData";

export const App = ({ section = "ae", page = "vessel" }) => {
  const location = useLocation();

  // ================= PAGE / SECTION =================
  const [activePage, setActivePage] = useState(page);
  const [currentSection, setCurrentSection] = useState(section);

  // ================= FILTER STATE =================
  const [selectedCompany, setSelectedCompany] = useState("All");
  const [companies, setCompanies] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // ================= DATA =================
  const {
    vessels,
    generalLedger,
    openBillRequest,
    loading,
    fetchData,
  } = useDashboardData();

  // ================= RESET FILTERS =================
  const resetFilters = () => {
    setSelectedCompany("All");
    setStartDate(null);
    setEndDate(null);
    setSearchQuery("");
  };

  // ================= RESOLVE ROUTE =================
  usePageResolver(
    location,
    page,
    section,
    setActivePage,
    setCurrentSection,
    resetFilters,
    fetchData
  );

  // ================= COMPANY LIST =================
  useMemo(() => {
    let list = [];

    if (activePage === "vessels") {
      list = vessels.map(v => v.acctCompanyName);
    }

    if (activePage === "general-ledger") {
      list =
        currentSection === "vships"
          ? generalLedger.map(g => g["Voucher No"])
          : generalLedger.map(g => g.documentNumber);
    }

    if (activePage === "openbillrequest") {
      list = openBillRequest.map(b => b.vendorCompanyName);
    }

    setCompanies(["All", ...new Set(list.filter(Boolean))]);
  }, [vessels, generalLedger, openBillRequest, activePage, currentSection]);

  // ================= FILTERED DATA =================
  const filteredData = useMemo(
    () =>
      filterDataByPage({
        activePage,
        vessels,
        generalLedger,
        openBillRequest,
        selectedCompany,
        searchQuery,
        startDate,
        endDate,
        currentSection,
      }),
    [
      activePage,
      vessels,
      generalLedger,
      openBillRequest,
      selectedCompany,
      searchQuery,
      startDate,
      endDate,
      currentSection,
    ]
  );

  // ================= RENDER =================
  return (
    <Box sx={{ bgcolor: "#f2f4f7", minHeight: "100vh" }}>
      <HeaderSection section={currentSection} />

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
            recordCount={filteredData.length}
            filteredData={filteredData}
            section={currentSection}
            activePage={activePage}
          />
        </LocalizationProvider>

        <Stack sx={{ width: "100%" }}>
          <MainContentSection
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            recordCount={filteredData.length}
            onUploadExcel={() => fetchData(currentSection, activePage)}
            onRefresh={() => fetchData(currentSection, activePage)}
            section={currentSection}
            activePage={activePage}
          />

          {activePage === "vessels" && (
            <VesselTableSection vessels={filteredData} />
          )}

          {activePage === "general-ledger" && (
            <GeneralLedgerTable
              data={filteredData}
              loading={loading}
              section={currentSection}
            />
          )}

          {activePage === "openbillrequest" && (
            <OpenBillRequestSection
              data={filteredData}
              loading={loading}
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};
