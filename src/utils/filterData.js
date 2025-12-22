export const filterDataByPage = ({
  activePage,
  vessels,
  generalLedger,
  openBillRequest,
  selectedCompany,
  searchQuery,
  startDate,
  endDate,
  currentSection,
}) => {
  if (activePage === "vessels") {
    return vessels.filter(v => {
      const companyOk = selectedCompany === "All" || v.acctCompanyName === selectedCompany;
      const searchOk =
        !searchQuery ||
        v.vesselName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.vesselImo?.toString().includes(searchQuery);
      return companyOk && searchOk;
    });
  }

  if (activePage === "general-ledger") {
    return generalLedger.filter(g => {
      const companyOk =
        selectedCompany === "All" ||
        (currentSection === "vships"
          ? g["Voucher No"] === selectedCompany
          : g.documentNumber === selectedCompany);

      const dateOk =
        !startDate || !endDate ||
        new Date(g.transactionDate || g["Ledger Date"]) >= new Date(startDate) &&
        new Date(g.transactionDate || g["Ledger Date"]) <= new Date(endDate);

      return companyOk && dateOk;
    });
  }

  if (activePage === "openbillrequest") {
    return openBillRequest.filter(b => {
      const companyOk = selectedCompany === "All" || b.vendorCompanyName === selectedCompany;
      return companyOk;
    });
  }

  return [];
};
