import { useState } from "react";
import {
  fetchVessels,
  fetchGeneralLedger,
  fetchOpenBillRequest,
} from "../api/apiHandler";

export const useDashboardData = () => {
  const [vessels, setVessels] = useState([]);
  const [generalLedger, setGeneralLedger] = useState([]);
  const [openBillRequest, setOpenBillRequest] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async (section, page) => {
    setLoading(true);
    try {
      const [vRes, gRes, oRes] = await Promise.all([
        fetchVessels(section),
        fetchGeneralLedger(section, page),
        fetchOpenBillRequest(section),
      ]);

      setVessels(vRes.data || []);
      setGeneralLedger(gRes.data || []);
      setOpenBillRequest(oRes.data || []);
    } finally {
      setLoading(false);
    }
  };

  return {
    vessels,
    generalLedger,
    openBillRequest,
    loading,
    fetchData,
  };
};
