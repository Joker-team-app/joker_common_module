// API Request + Models
export { ContactType } from "./api/models/ContactType";
export { SendVerifyCodeAction } from "./api/models/SendVerifyCodeAction";
export { VerifyAccountForResetPasswordType } from "./api/models/VerifyAccountForResetPasswordType";

// API Response Payloads
export type { LoginResponse } from "./api/response_payload/LoginResponseRP";
export * from "./api/response_payload/ResetPasswordRP";
export * from "./api/response_payload/SendVerifyCodeRP";
export * from "./api/response_payload/VerifyAccountForResetPasswordRP";
export * from "./api/response_payload/VerifyCodeRP";

// Utilities
export {
  getBaseUri,
  getLocalApiUrl,
  saveLocalUrl,
  removeLocalUrl,
  notificationToken,
} from "./api/util/contants";

export {
  aesEncrypt,
  sha256,
  decryptBackendPayload,
} from "./api/util/cryptoUtils";
export {
  ApiType,
  createEncryptedPayload,
  computeHash,
  apiPostRequest,
} from "./api/util/apiUtils";
export type { APIResponse } from "./api/util/apiUtils";

export { withLoading } from "./api/util/apiWrapper";
// export * from "./api/axios-config";

// Store (Slices + Store)
export {
  loginSlice,
  loginApi,
  verifySoccerTokenApi,
  loginActions,
  loginResponseDetails,
  default as loginReducer,
} from "./store/login-slice";

export {
  forgetSlice,
  sendVerifyCodePassword,
  verifyCodePassword,
  resetPassword,
  forgetActions,
  default as forgetReducer,
  recoverUsername,
} from "./store/forget-slice";

export {
  onBoardingSlice,
  earlyBirdVerifyCode,
  verifyOnboardingEmailCode,
  checkEmailExist,
  checkPhoneExist,
  setFullName,
  sendVerifyCode,
  verifyEmailCode,
  verifyCode,
  checkUsernameExist,
  register,
  onBoardingActions,
  default as onBoardingReducer,
} from "./store/on-boarding-slice";

export {
  loadingSlice,
  setLoading,
  default as loadingReducer,
} from "./store/loading-slice";
export { coreReducers, corePersistConfig } from "./store/store";

export { setGlobalLogout, triggerGlobalLogout } from "./util/logoutHandlex";
