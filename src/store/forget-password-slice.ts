import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  ResetPassword,
  SendVerifyCode,
  VerifyCode,
} from "../api/api_request/auth";
import { SendVerifyCodeAction } from "../api/models/SendVerifyCodeAction";
import { ContactType } from "../api/models/ContactType";
import { withLoading } from "../api/util/apiWrapper";

interface ForgetPasswordState {
  email: string;
  verificationCode: string;
  newPassword: string;
}

// Define the initial state using that type
const initialState: ForgetPasswordState = {
  email: "",
  verificationCode: "",
  newPassword: "",
};

export const forgetPasswordSlice = createSlice({
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

    dispatch(forgetPasswordActions.setVerificationCode(pin));
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

    dispatch(forgetPasswordActions.setPassword(password));
  }
);

export const forgetPasswordActions = forgetPasswordSlice.actions;

export default forgetPasswordSlice.reducer;
