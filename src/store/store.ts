import forgetPasswordReducer from "./forget-password-slice";
import onBoardingReducer from "./on-boarding-slice";
import loginReducer from "./login-slice";
import loadingReducer from "./loading-slice";
import { encryptionTransformed } from "./EncryptionTransformed";
import storage from "redux-persist/lib/storage";
import { UnknownAction, Reducer } from "@reduxjs/toolkit";

export const coreReducers: Record<string, Reducer<any, UnknownAction>> = {
  forgetPassword: forgetPasswordReducer,
  onBoarding: onBoardingReducer,
  login: loginReducer,
  loading: loadingReducer,
};

export const corePersistConfig = {
  key: "core",
  storage,
  whitelist: ["login"],
  transforms: [encryptionTransformed],
};
