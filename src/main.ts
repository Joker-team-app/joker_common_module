// API Request + Models
export * from "./api/models/ContactType";
export * from "./api/models/SendVerifyCodeAction";
export * from "./api/models/VerifyAccountForResetPasswordType";

// API Response Payloads
export * from "./api/response_payload/LoginResponseRP";
export * from "./api/response_payload/ResetPasswordRP";
export * from "./api/response_payload/SendVerifyCodeRP";
export * from "./api/response_payload/VerifyAccountForResetPasswordRP";
export * from "./api/response_payload/VerifyCodeRP";

// Utilities
export {
  getBaseUri,
  getLocalApiUrl,
  notificationToken,
} from "./api/util/contants";
export { aesEncrypt, sha256 } from "./api/util/cryptoUtils";
export {
  ApiType,
  createEncryptedPayload,
  computeHash,
  apiPostRequest,
} from "./api/util/apiUtils";
export type { APIResponse } from "./api/util/apiUtils";

export * from "./api/util/apiWrapper";
// export * from "./api/axios-config";

// Store (Slices + Store)
export * from "./store/login-slice";
export * from "./store/forget-password-slice";
export * from "./store/on-boarding-slice";
export * from "./store/loading-slice";
export { coreReducers, corePersistConfig } from "./store/store";

export  { setGlobalLogout, triggerGlobalLogout } from "./util/logoutHandlex";
