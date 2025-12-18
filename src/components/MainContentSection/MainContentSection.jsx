import CloseIcon from "@mui/icons-material/Close";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  Box,
  Chip,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const MainContentSection = ({
  searchQuery,
  setSearchQuery,
  recordCount,
  onUploadExcel,
  onRefresh, // function to refetch API
}) => {
  const location = useLocation();
  const fileInputRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const pathname = location.pathname;

  /* ===== PAGE DETECTION ===== */
  const isVesselsPage =
    pathname === "/ae/vessel" || pathname === "/vships/vessel";

  const isLedgerPage =
    pathname === "/ae/general-ledger" || pathname === "/vships/general-ledger";

  const isOpenBillPage =
    pathname === "/ae/openbillrequest" || pathname === "/vships/openbillrequest";

  const showRefreshButton = pathname === "/ae/general-ledger";
  const showUploadButton = pathname === "/vships/general-ledger"; // only VShips General Ledger

  const isSpecialPage = isLedgerPage || isOpenBillPage;

  const searchPlaceholder = isVesselsPage
    ? "Search by Vessel Name or IMO..."
    : isLedgerPage
    ? "Search by Document No / Accounting No..."
    : isOpenBillPage
    ? "Search by Bill No / Vendor..."
    : "Search...";

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  /* ===== FILE HANDLERS ===== */
  const handleButtonClick = () => {
    if (!uploading) fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!/\.(xls|xlsx)$/i.test(file.name)) {
      setToast({
        open: true,
        message: "Only Excel files (.xls, .xlsx) are allowed",
        severity: "error",
      });
      e.target.value = "";
      return;
    }

    try {
      setUploading(true);
      await delay(2000); // simulate upload delay
      await onUploadExcel(file);

      setToast({
        open: true,
        message: "Excel file uploaded successfully",
        severity: "success",
      });
    } catch (error) {
      setToast({
        open: true,
        message: "Upload failed. Please try again",
        severity: "error",
      });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  /* ===== REFRESH HANDLER ===== */
  const handleRefresh = async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    await onRefresh();
    setRefreshing(false);
    setToast({
      open: true,
      message: "Data refreshed successfully",
      severity: "success",
    });
  };

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 96,
          zIndex: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 2,
          bgcolor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        {/* ===== TITLE ===== */}
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            {isVesselsPage
              ? "Vessel Details"
              : isLedgerPage
              ? "General Ledger"
              : isOpenBillPage
              ? "Open Bill Requests"
              : ""}
          </Typography>

          <Chip
            label={
              isSpecialPage ? `${recordCount} Records` : `${recordCount} Vessels`
            }
            sx={{
              bgcolor: "#174bcc1a",
              color: "#174bcc",
              fontWeight: 600,
              fontSize: 14,
              height: "auto",
              px: 1.2,
              py: 0.4,
              borderRadius: "16px",
            }}
          />
        </Stack>

        {/* ===== ACTIONS ===== */}
        <Stack direction="row" spacing={2} alignItems="center">
          <TextField
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            sx={{ width: 300 }}
            InputProps={{
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <CloseIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => setSearchQuery("")}
                  />
                </InputAdornment>
              ),
            }}
          />

          {/* REFRESH BUTTON */}
          {showRefreshButton && (
            <Button
              variant="contained"
              startIcon={
                refreshing ? <CircularProgress size={18} color="inherit" /> : <RefreshIcon />
              }
              onClick={handleRefresh}
              sx={{
                textTransform: "none",
                fontWeight: 600,
                backgroundColor: "#184a70ff",
              }}
              disabled={refreshing}
            >
              {refreshing ? "Refreshing..." : "Refresh"}
            </Button>
          )}

          {/* UPLOAD BUTTON */}
          {showUploadButton && (
            <>
              <input
                type="file"
                ref={fileInputRef}
                hidden
                accept=".xls,.xlsx"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                startIcon={
                  uploading ? <CircularProgress size={18} color="inherit" /> : <UploadFileIcon />
                }
                disabled={uploading}
                onClick={handleButtonClick}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  backgroundColor: "#184a70ff",
                }}
              >
                {uploading ? "Uploading..." : "Upload Excel File"}
              </Button>
            </>
          )}
        </Stack>
      </Box>

      {/* ===== TOAST ===== */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};
