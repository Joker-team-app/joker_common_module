import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { forgetPasswordSlice } from "./forget-password-slice.js";
import { onBoardingSlice } from "./on-boarding-slice.js";
import { loginSlice } from "./login-slice.js";
import { loadingSlice } from "./loading-slice.js";
import { encryptionTransformed } from "./EncryptionTransformed.js";

// Combine reducers
const rootReducer = combineReducers({
  forgetPassword: forgetPasswordSlice.reducer,
  onBoarding: onBoardingSlice.reducer,
  login: loginSlice.reducer,
  loading: loadingSlice.reducer,
});

// Persist config — only persist the onBoarding slice
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["login"], // Only persist onBoarding
  transforms: [encryptionTransformed],
};

type RootReducerState = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootReducerState>(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
