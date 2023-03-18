import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://imageuploaderapi-rhim.onrender.com/api",
});

export default axiosInstance;
