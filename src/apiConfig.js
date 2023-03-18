import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://imageuploader-backend-production.up.railway.app/api",
});

export default axiosInstance;
