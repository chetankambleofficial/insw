// src/api/apiHandler.js
import axios from "axios";

// 🔹 ENV based base URL
const baseURL = import.meta.env.VITE_API_BASE_URL;

// 🔹 SINGLE reusable GET method
const doGet = (url, config = {}) => {
  return axios.get(url, config);
};

// 🔹 Vessel API resolver
export const fetchVessels = (section) => {
  let vesselURL = "";

  if (section === "ae") {
    vesselURL = `${baseURL}/vessel/vessels/AETMS`;
  } else if (section === "vships") {
    vesselURL = `${baseURL}/vessel/vessels/V.Ships`;
  }

  return doGet(vesselURL);
};

// 🔹 General Ledger API resolver
export const fetchGeneralLedger = (section, page) => {
  let glURL = `${baseURL}/general-ledger`;

  if (section === "vships" && page === "general-ledger") {
    glURL = `${baseURL}/vships-general-ledger`;
  }

  return doGet(glURL);
};

// 🔹 Open Bill Request API
export const fetchOpenBillRequest = (section) => {
  return doGet(`${baseURL}/openbillrequest?section=${section}`);
};
