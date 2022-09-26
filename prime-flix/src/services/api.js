import axios from "axios";

// URL Base: https://api.themoviedb.org/3
// /movie/550?api_key=8722a889e8aa183266cfc4a9386ffa0e

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

export default api;
