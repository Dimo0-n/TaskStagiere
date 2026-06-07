import axios from "axios";

const API_URL = "http://localhost:8080/api/documents";

export const createComplaint = (data) =>
    axios.post(`${API_URL}/complaint`, data, {
        responseType: "blob"
    });

export const createPowerOfAttorney = (data) =>
    axios.post(`${API_URL}/power-of-attorney`, data, {
        responseType: "blob"
    });

export const createStatementOfClaim = (data) =>
    axios.post(`${API_URL}/statement-of-claim`, data, {
        responseType: "blob"
    });