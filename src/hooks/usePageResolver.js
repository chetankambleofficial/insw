import { useEffect } from "react";

export const usePageResolver = (
  location,
  page,
  section,
  setActivePage,
  setCurrentSection,
  resetFilters,
  fetchData
) => {
  useEffect(() => {
    let newActivePage = page;
    let newSection = section;

    if (location.pathname.includes("vessel")) newActivePage = "vessels";
    if (location.pathname.includes("general-ledger")) newActivePage = "general-ledger";
    if (location.pathname.includes("openbillrequest")) newActivePage = "openbillrequest";
    if (location.pathname.includes("vships")) newSection = "vships";

    setActivePage(newActivePage);
    setCurrentSection(newSection);

    resetFilters();
    fetchData(newSection, newActivePage);
  }, [location.pathname]);
};
