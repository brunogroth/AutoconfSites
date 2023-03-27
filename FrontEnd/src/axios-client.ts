import axios, { AxiosRequestConfig } from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

//Interceptors - Functions executed before the request is sent or after the response is received.

// REQUEST.USE() = All requests gonna use this config
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`
  return config;
});

// RESPONSE.USE() - All responses gonna use
// "response.use" receives two functions: onFullfiled and onRejected.
axiosClient.interceptors.response.use(
  // onFulfilled
  (response) => {

    return response;
    // onRejected
  }, (error) => {
    try {
      // response is inside error.
      const { response } = error;

      // Threat errors
      if (response.status === 401) {
        localStorage.removeItem('ACCESS_TOKEN');
      }
    } catch (e) {
      console.log(e);
    }
    throw error;
  })
export default axiosClient;