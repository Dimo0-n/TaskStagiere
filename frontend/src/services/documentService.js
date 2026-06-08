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

export async function fetchDocuments() {
    const res = await fetch(`${API_URL}/all`);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    return res.json();
}