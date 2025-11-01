import axios from "axios";
import appConfig from "../components/configs/app.config";
import { REQUEST_HEADER_AUTH_KEY, TOKEN_TYPE } from "../constants/api.constant";
import store, { setUser, signOutSuccess } from "../store";
import {
  clearAllAuthData,
  getDecryptedToken,
} from "../utils/functions/tokenEncryption";

const unauthorizedCode = [401, 403, 419];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: appConfig.apiPrefix,
});

BaseService.interceptors.request.use(
  (config) => {
    // Get decrypted token from localStorage
    const accessToken = getDecryptedToken();

    if (accessToken) {
      config.headers[REQUEST_HEADER_AUTH_KEY] = `${TOKEN_TYPE}${accessToken}`;
    } else {
      console.warn('⚠️ No access token found. API request will be sent without authentication.');
    }

    // Log request details in development
    if (import.meta.env.DEV) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }

    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  (error) => {
    const { response, config } = error;

    // Enhanced error logging
    if (response) {
      console.error(`❌ API Error: ${response.status} ${config?.url}`, {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        url: config?.url,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error('❌ Network Error: No response received', {
        message: error.message,
        url: config?.url,
        baseURL: config?.baseURL,
      });
      console.error('This usually means:');
      console.error('1. Backend server is down or not accessible');
      console.error('2. CORS is blocking the request');
      console.error('3. Network connectivity issues');
    } else {
      // Something else happened
      console.error('❌ Request Setup Error:', error.message);
    }

    if (response && unauthorizedCode.includes(response.status)) {
      console.warn('⚠️ Unauthorized access. Logging out...');
      store.dispatch(signOutSuccess());
      store.dispatch(
        setUser({
          avatar: "",
          name: "",
          email: "",
          role: "client",
        })
      );
      clearAllAuthData();

      if (window.location.pathname !== appConfig.unAuthenticatedEntryPath) {
        window.location.href = appConfig.unAuthenticatedEntryPath;
      }
    }

    return Promise.reject(error);
  }
);

export default BaseService;
