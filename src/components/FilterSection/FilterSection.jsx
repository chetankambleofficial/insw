import React from "react";
import {
  Box,
  Stack,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
  Button,
  CircularProgress,
  Tooltip,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

import { useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const FilterSection = ({
  companies = [],
  selectedCompany,
  setSelectedCompany,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  loading,
  setSearchQuery,
  recordCount,

  /** 👇 NEW PROP */
  filteredData = [],
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const hidePeriod =
    pathname === "/" ||
    pathname === "/ae/vessel" ||
    pathname === "/vships/vessel";

  const isLedgerPage =
    pathname === "/ae/general-ledger" || pathname === "/vships/general-ledger";

  const isOpenBillPage =
    pathname === "/ae/openbillrequest" || pathname === "/vships/openbillrequest";

  const selectLabel = isLedgerPage
    ? "Select Document No"
    : isOpenBillPage
    ? "Select Vendor Company"
    : "Select Company";

  /* ================= DOWNLOAD PDF ================= */
  const handleDownloadPDF = () => {
    if (!filteredData.length) return;

    const doc = new jsPDF();
    const title = isLedgerPage
      ? "General Ledger Report"
      : isOpenBillPage
      ? "Open Bill Request Report"
      : "Vessel Report";

    doc.setFontSize(14);
    doc.text(title, 14, 15);

    doc.setFontSize(10);
    doc.text(`Company: ${selectedCompany}`, 14, 22);
    doc.text(`Total Records: ${filteredData.length}`, 14, 28);

    /** Build columns dynamically */
    const columns = Object.keys(filteredData[0]).slice(0, 6);
    const rows = filteredData.map((row) =>
      columns.map((col) => row[col] ?? "-")
    );

    autoTable(doc, {
      startY: 34,
      head: [columns],
      body: rows,
      styles: { fontSize: 8 },
      headStyles: {
        fillColor: [24, 74, 112],
        textColor: 255,
      },
    });

    doc.save(`${title.replaceAll(" ", "_")}.pdf`);
  };

  return (
    <Box
      sx={{
        position: "sticky",
        top: 96,
        height: "calc(100vh - 110px)",
        overflowY: "auto",
        bgcolor: "#f5f5f5",
        borderRight: 1,
        borderColor: "divider",
        p: 3,
        width: 360,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, color: "#184a70ff" }}>
        Filters
      </Typography>

      {/* ===== Company Filter ===== */}
      <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2 }}>
        <Stack spacing={1}>
          <Typography fontWeight={600}>
            <BusinessIcon sx={{ mr: 1, fontSize: 18 }} />
            {selectLabel}
          </Typography>

          <TextField
            select
            size="small"
            value={selectedCompany || "All"}
            onChange={(e) => setSelectedCompany(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon />
                </InputAdornment>
              ),
            }}
            SelectProps={{ IconComponent: ExpandMoreIcon }}
          >
            <MenuItem value="All">All</MenuItem>
            {companies.filter((c) => c !== "All").map((c, i) => (
              <MenuItem key={i} value={c}>
                {c}
              </MenuItem>
            ))}
          </TextField>
        </Stack>
      </Box>

      {/* ===== Period ===== */}
      {!hidePeriod && (
        <Box sx={{ p: 2, bgcolor: "#fff", borderRadius: 2 }}>
          <Stack spacing={2}>
            <Typography fontWeight={600}>
              <CalendarMonthIcon sx={{ mr: 1, fontSize: 18 }} />
              Period
            </Typography>

            <DatePicker
              label="Start Month"
              views={["year", "month"]}
              openTo="month"
              value={startDate}
              format="MM/YYYY"
              onChange={(value) => {
                if (!value) {
                  setStartDate(null);
                  setEndDate(null);
                  return;
                }
                setStartDate(value.startOf("month"));
                setEndDate(value.endOf("month"));
              }}
            />

            <DatePicker
              label="End Month"
              views={["year", "month"]}
              value={endDate}
              readOnly
              format="MM/YYYY"
            />
          </Stack>
        </Box>
      )}

      {/* ===== Total Records ===== */}
      {/* <Typography
        variant="body2"
        color="text.secondary"
        sx={{ textAlign: "center" }}
      >
        Total Records: {recordCount}
      </Typography> */}

      {/* ===== Reset ===== */}
      <Button
        variant="outlined"
        sx={{ textTransform: "none", fontWeight: 600 }}
        onClick={() => {
          setSelectedCompany("All");
          setStartDate(null);
          setEndDate(null);
          setSearchQuery("");
        }}
      >
        Reset Filters
      </Button>

      {/* ===== Loader ===== */}
      {loading && (
        <Stack alignItems="center" spacing={1}>
          <CircularProgress size={26} />
          <Typography fontSize={13}>Loading data...</Typography>
        </Stack>
      )}

      {/* ===== Download PDF ===== */}
      <Tooltip title="Download filtered data as PDF">
        <Button
          startIcon={<DownloadIcon />}
          onClick={handleDownloadPDF}
          disabled={!filteredData.length}
          sx={{
            mt: "auto",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "10px",
            py: 1.2,
            color: "#184a70ff",
            border: "1px dashed #184a70ff",
            bgcolor: "#f5f7ff",
            "&:hover": {
              bgcolor: "#eef2ff",
            },
          }}
        >
          Download Report
        </Button>
      </Tooltip>
    </Box>
  );
};
