import axios, { AxiosInstance } from "axios";
import configuration from "@/config/configuration";

// Define a type for API configuration
interface APIConfig {
  baseURL: string;
  timeout: number;
}

// Create the Axios instance
const apiConfig: APIConfig = {
  baseURL: configuration?.API_URL, // Environment variable for the base URL
  timeout: 10000, // Request timeout in milliseconds
};

const apiClient: AxiosInstance = axios.create(apiConfig);

apiClient.interceptors.request.use(
  (config: any) => {
    // Retrieve the token from localStorage
    const token = localStorage.getItem("authorization");

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    // Default Content-Type to JSON if not already set
    if (!config.headers?.["Content-Type"]) {
      config.headers = {
        ...config.headers,
        "Content-Type": "application/json",
      };
    }

    // If FormData is detected, override the Content-Type
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors, such as token expiration
    if (error.response?.status === 401) {
      console.error("Unauthorized: Token might be invalid or expired.");
      localStorage.removeItem("authToken"); // Clear the token from localStorage
    }
    return Promise.reject(error);
  }
);

export default apiClient;
