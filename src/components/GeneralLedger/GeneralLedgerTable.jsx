import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CloseIcon from "@mui/icons-material/Close";

const GeneralLedgerTable = ({ data = [], section = "ae" }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const formatCurrency = (value) => {
    if (value == null) return "-";
    return Number(value).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formatDate = (value) =>
    value ? new Date(value).toLocaleDateString() : "-";

  // ===== dynamic columns =====
  const columns = section === "ae"
    ? [
        { label: "SNO", key: "sno" },
        { label: "Vessel IMO", key: "vesselImo" },
        { label: "Vessel AE Code", key: "vesselAeCode" },
        { label: "Accounting Period", key: "accountingPeriod" },
        { label: "Document No", key: "documentNumber" },
        { label: "Accounting No", key: "accountingNumber" },
        { label: "Transaction Date", key: "transactionDate" },
        { label: "Base Currency", key: "baseCurrency" },
        { label: "Base Amount", key: "baseAmount" },
      ]
    : [
        { label: "SNO", key: "sno" },
        { label: "Vessel Name", key: "Vessel Name" },
        { label: "Doc Type", key: "Doc Type" },
        { label: "Client Acc No", key: "ClientAccNo" },
        { label: "Document No", key: "Voucher No" },
        { label: "Account Code", key: "Account Code" },
        { label: "Ledger Date", key: "Ledger Date" },
        { label: "Currency", key: "Currency" },
        { label: "Amount (Base Curr.)", key: "Amount (Base Curr.)" },
      ];

  return (
    <Box sx={{ width: "100%", mt: 0 }}>
      <TableContainer component={Paper} sx={{ borderRadius: 0, maxHeight: "77vh", overflowY: "auto" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ position: "sticky", top: 0, zIndex: 10, background: "#184a70ff" }}>
              {columns.map((col) => (
                <TableCell key={col.key} sx={{ fontWeight: 600, color: "#fff" }}>{col.label}</TableCell>
              ))}
              <TableCell sx={{ fontWeight: 600, color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length + 1} align="center">No records found</TableCell>
              </TableRow>
            )}

            {data.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? "#fff" : "#edebebff", "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" } }}>
                {columns.map((col) => {
                  let value = col.key === "sno" ? index + 1 : row[col.key] ?? "-";
                  if (col.key.toLowerCase().includes("amount")) value = formatCurrency(value);
                  if (col.key.toLowerCase().includes("date")) value = formatDate(value);
                  return <TableCell key={col.key}>{value}</TableCell>;
                })}
                <TableCell>
                  <IconButton sx={{ color: "#184a70ff" }} onClick={() => setSelectedRow(row)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal */}
      {selectedRow && (
        <Box sx={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, px: 2 }}>
          <Card sx={{ width: "100%", maxWidth: 650, maxHeight: "80vh", borderRadius: 2, overflowY: "auto", p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="h6">
                Ledger Details — {selectedRow.documentNumber || selectedRow["Voucher No"]}
              </Typography>
              <IconButton onClick={() => setSelectedRow(null)}><CloseIcon /></IconButton>
            </Box>

            <Table size="small">
              <TableBody>
                {Object.entries(selectedRow).map(([key, value]) => {
                  let displayValue = value;
                  if (key.toLowerCase().includes("amount")) displayValue = formatCurrency(value);
                  if (key.toLowerCase().includes("date")) displayValue = formatDate(value);
                  return (
                    <TableRow key={key}>
                      <TableCell sx={{ fontWeight: 600 }}>{key}</TableCell>
                      <TableCell>{displayValue ?? "-"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default GeneralLedgerTable;
