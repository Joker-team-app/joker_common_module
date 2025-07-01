//API Domain Name

import {
  showConsoleError,
  showConsoleMessage,
} from "../../util/ConsoleMessage.js";
import { FIREBASE_TOKEN, LOCAL_URL } from "../../util/StorageConstant";

export const BASE_URI = import.meta.env.VITE_BASE_URL;

export const getLocalApiUrl = () => {
  const localApiLogged = localStorage.getItem(LOCAL_URL);
  if (localApiLogged) {
    try {
      return localApiLogged.slice(0, -1) || null;
    } catch (error) {
      showConsoleError("Error parsing local_api_logged:", error);
    }
  } else {
    showConsoleMessage("No data in localStorage.");
  }
  return null;
};

export const getBaseUri = () => {
  showConsoleMessage("Main -Using Default API URL:", BASE_URI);
  return BASE_URI;
};

export const Endpoint = {
  Register: `${getBaseUri()}/Member/Register`,
  Login: `${getBaseUri()}/Member/LoginByUsername`,
  LoginByEmail: `${getBaseUri()}/Member/LoginByEmail`,
  VerifyAccountForResetPassword: `${getBaseUri()}/Member/VerifyAccountForResetPassword`,
  SendVerifyCode: `${getBaseUri()}/Member/SendVerifyCode`,
  VerifyCode: `${getBaseUri()}/Member/VerifyCode`,
  ResetPassword: `${getBaseUri()}/Member/ResetPassword`,
  CheckEmail: `${getBaseUri()}/Member/CheckEmail`,
  VerifyEmail: `${getBaseUri()}/Member/VerifyEmail`,
  CheckUsername: `${getBaseUri()}/Member/CheckUsername`,
  CheckPhoneNumber: `${getBaseUri()}/Member/CheckPhoneNumber`,
  RecoverUsername: `${getBaseUri()}/Member/RecoverUsernameByEmail`,
};

export const validate = (value: string, fieldName: string) => {
  if (!value) {
    throw new Error(
      `The field "${fieldName}" is required and cannot be empty.`
    );
  }
  return value;
};

//API Constants
export const notificationToken =
  localStorage.getItem(FIREBASE_TOKEN) ?? "12345";
export const sha256Salt = String(import.meta.env.VITE_SHA256SALT);
export const secretKey = String(import.meta.env.VITE_SECRET_KEY);
export const apiKey = String(import.meta.env.VITE_API_KEY || "");
