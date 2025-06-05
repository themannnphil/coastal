import axios from "axios";

export const api = axios.create({
  baseURL: "https://your-fastapi-backend/api",
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    "Content-Type": "application/json",
  },
});
