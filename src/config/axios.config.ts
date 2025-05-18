import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todo-production-730c.up.railway.app/api/v1/",
});

export default axiosInstance;
