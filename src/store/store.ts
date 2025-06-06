import { forgetPasswordSlice } from "./forget-password-slice";
import { onBoardingSlice } from "./on-boarding-slice";
import { loginSlice } from "./login-slice";
import { loadingSlice } from "./loading-slice";
import { encryptionTransformed } from "./EncryptionTransformed";
import storage from "redux-persist/lib/storage";

export const coreReducers = {
  forgetPassword: forgetPasswordSlice.reducer,
  onBoarding: onBoardingSlice.reducer,
  login: loginSlice.reducer,
  loading: loadingSlice.reducer,
};

export const corePersistConfig = {
  key: "core",
  storage,
  whitelist: ["login"],
  transforms: [encryptionTransformed],
};
