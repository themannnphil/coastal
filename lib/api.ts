// lib/api.ts
import axios from "axios";

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/metrics",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    "Content-Type": "application/json",
  },
});
