import axios from "axios";
import { apiKey } from "./util/contants";
import { showConsoleError, showConsoleMessage } from "../util/ConsoleMessage";
import { triggerGlobalLogout } from "../util/logoutHandlex";

export interface AuthErrors {
  data: {
    error: string;
    status: number;
  };
}

axios.interceptors.request.use(
  async (config) => {
    showConsoleMessage("Resquest: ", config);
    config.headers.set("Authorization", `Key=${apiKey}`);
    config.headers.set("Accept", "*/*");
    config.headers.set("Content-Type", "text/plain");
    config.transformRequest = [(data) => data];
    return config;
  },
  (error) => {
    showConsoleError("Request config error", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    showConsoleMessage("Response:", response.data);

    if (response.data?.ResponseCode !== 0) {
      if (response.data?.ResponseCode === -999) {
        triggerGlobalLogout();
      } else {
        const error: AuthErrors = {
          data: {
            error: response.data?.ResponseMsg || "Unknown error..",
            status: response.data.ResponseCode,
          },
        };
        return Promise.reject(error);
      }
    }
    return response;
  },
  (e) => {
    showConsoleError("Response Error: ", e.response || e.message);
    const error: AuthErrors = {
      data: { error: e.response || e.message || "Unknown error", status: -1 },
    };
    return Promise.reject(error);
  }
);

export const Request = axios;
export default axios;
