import {
  createSlice,
  PayloadAction,
  Reducer,
  UnknownAction,
} from "@reduxjs/toolkit";
import {
  RecoverUsername,
  ResetPassword,
  SendVerifyCode,
  VerifyCode,
} from "../api/api_request/auth";
import { SendVerifyCodeAction } from "../api/models/SendVerifyCodeAction";
import { ContactType } from "../api/models/ContactType";
import { withLoading } from "../api/util/apiWrapper";

export interface ForgetState {
  email: string;
  verificationCode: string;
  newPassword: string;
}

// Define the initial state using that type
const initialState: ForgetState = {
  email: "",
  verificationCode: "",
  newPassword: "",
};

export const forgetSlice = createSlice({
  name: "forget-password",
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setVerificationCode: (state, action: PayloadAction<string>) => {
      state.verificationCode = action.payload;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },
  },
});

export const sendVerifyCodePassword = withLoading(
  async (_dispatch, getState) => {
    const email = getState().forgetPassword.email;

    await SendVerifyCode(
      SendVerifyCodeAction.resetPassword,
      ContactType.email,
      email
    );
  }
);

export const verifyCodePassword = withLoading(
  async (dispatch, getState, pin: string) => {
    const email = getState().forgetPassword.email;

    await VerifyCode(
      SendVerifyCodeAction.resetPassword,
      ContactType.email,
      email,
      pin
    );

    dispatch(forgetActions.setVerificationCode(pin));
  }
);

export const resetPassword = withLoading(
  async (dispatch, getState, password: string) => {
    const state = getState();
    const email = state.forgetPassword.email;
    const pin = state.forgetPassword.verificationCode;

    await ResetPassword(
      SendVerifyCodeAction.resetPassword,
      ContactType.email,
      email,
      pin,
      password
    );

    dispatch(forgetActions.setPassword(password));
  }
);

export const recoverUsername = withLoading(
  async (_dispatch, _getState, email: string) => {
    await RecoverUsername(email);
  }
);

export const forgetActions = forgetSlice.actions;

const forgetReducer: Reducer<ForgetState, UnknownAction> = forgetSlice.reducer;

export default forgetReducer;
