// import axios from "axios";

// const token = process.env.NEXT_PUBLIC_API_KEY || ""; // or securely via Next Auth/session

// const axiosClient = axios.create({
//   baseURL: "https://dummyapi.com/api",
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
// });

// export default axiosClient;
// lib/axiosClient.ts
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "", // use '' so axios hits Next.js API routes locally
});

export default axiosClient;
