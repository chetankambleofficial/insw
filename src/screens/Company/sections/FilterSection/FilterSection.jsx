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
  Divider,
} from "@mui/material";

import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DownloadIcon from "@mui/icons-material/Download";

import { useLocation } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const FilterSection = ({
  companies = [],
  selectedCompany,
  setSelectedCompany,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  loading,
  searchQuery,
  setSearchQuery,
  recordCount,
}) => {
  const location = useLocation();

  const pathname = location.pathname;

  const hidePeriod =
    pathname === "/" ||
    pathname === "/vessels" ||
    pathname.startsWith("/vessel");

  const isLedgerPage = pathname === "/general-ledger";
  const isOpenBillPage = pathname === "/openbillrequest";

  const selectLabel = isLedgerPage
    ? "Select Document No"
    : isOpenBillPage
    ? "Select Vendor Company"
    : "Select Company";

  return (
    <Box
      sx={{
        position: "sticky",
        top: 96,
        height: "calc(100vh - 110px)",
        overflowY: "auto",
        bgcolor: "#f5f5f5ff",
        borderRight: 1,
        borderColor: "divider",
        p: 3,
        width: 350,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Filter
      </Typography>

      <Divider />

      {/* Company / Document / Vendor Filter */}
      <Stack spacing={1}>
        <Typography>{selectLabel}</Typography>

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

          {companies
            .filter((c) => c !== "All")
            .map((c, i) => (
              <MenuItem key={i} value={c}>
                {c}
              </MenuItem>
            ))}
        </TextField>
      </Stack>

      {/* Period Filter */}
      {!hidePeriod && (
        <Stack spacing={1}>
          <Divider />
          <Typography>Period</Typography>

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

          <Divider />

          <DatePicker
            label="End Month"
            views={["year", "month"]}
            value={endDate}
            readOnly
            format="MM/YYYY"
          />
        </Stack>
      )}

      <Divider />

      {/* Total Records */}
      {recordCount !== undefined && (
        <Typography variant="body2" color="text.secondary">
          Total Records: {recordCount}
        </Typography>
      )}

      {/* Reset Button */}
      <Button
        variant="outlined"
        sx={{
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
          color:"#184a70ff",
          borderColor:"#184a70ff"
        }}
        onClick={() => {
          setSelectedCompany("All");
          setStartDate(null);
          setEndDate(null);
          setSearchQuery("");
        }}
      >
        Reset Filters
      </Button>

      {/* Loader */}
      {loading && (
        <Stack alignItems="center" spacing={1}>
          <CircularProgress size={26} />
          <Typography fontSize={13} color="text.secondary">
            Loading data...
          </Typography>
        </Stack>
      )}

      {/* Download */}
      <Button
        startIcon={<DownloadIcon />}
        sx={{
          mt: "auto",
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "10px",
          py: 1.2,
          color:"#184a70ff",
          border: "1px dashed #184a70ff",
          bgcolor: "#f5f7ff",
          "&:hover": {
            bgcolor: "#eef2ff",
            borderStyle: "solid",
          },
        }}
      >
        Download Report
      </Button>
    </Box>
  );
};
