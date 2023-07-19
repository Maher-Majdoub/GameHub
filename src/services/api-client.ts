import axios, { CanceledError } from "axios";
//import Cookies from "universal-cookie";

const API_KEY = "9c33bb60587e4e78a78e0c4828562459";

const apiClient = axios.create({
  baseURL: "https://api.rawg.io/api/",
  params: {
    key: API_KEY,
  },
});
export default apiClient;
export { CanceledError };
