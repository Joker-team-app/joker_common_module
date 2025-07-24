import forgetReducer from "./forget-slice";
import onBoardingReducer from "./on-boarding-slice";
import loginReducer from "./login-slice";
import loadingReducer from "./loading-slice";
import { encryptionTransformed } from "./EncryptionTransformed";
import storage from "redux-persist/lib/storage";
import { PersistConfig } from "redux-persist";

export const coreReducers = {
  forget: forgetReducer,
  onBoarding: onBoardingReducer,
  login: loginReducer,
  loading: loadingReducer,
};

type CoreState = {
  forget: ReturnType<typeof forgetReducer>;
  onBoarding: ReturnType<typeof onBoardingReducer>;
  login: ReturnType<typeof loginReducer>;
  loading: ReturnType<typeof loadingReducer>;
};

export const corePersistConfig: PersistConfig<CoreState> = {
  key: "core",
  storage,
  whitelist: ["login"],
  transforms: [encryptionTransformed],
};
