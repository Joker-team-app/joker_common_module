import {
  createSlice,
  Dispatch,
  PayloadAction,
  Reducer,
  UnknownAction,
} from "@reduxjs/toolkit";
import { withLoading } from "../api/util/apiWrapper.js";
import {
  CheckEmailExist,
  CheckPhoneExist,
  CheckUsernameExist,
  EarlyBirdVerifyCode,
  Register,
  SendVerifyCode,
  VerifyCode,
  VerifyEmailCode,
} from "../api/api_request/auth.js";
import { SendVerifyCodeAction } from "../api/models/SendVerifyCodeAction.js";
import { ContactType } from "../api/models/ContactType.js";
import { showConsoleError } from "../util/ConsoleMessage.js";
import { loginActions } from "./login-slice.js";

export interface onBoardingState {
  invitaitonCode?: string;
  email: string;
  mobile: string;
  name: string;
  emailVerificationId: string;
  mobileVerificationCode: string;
  emailVerificationCode: string;
  newPassword: string;
  username: string;
  pin: string;
}

const initialState: onBoardingState = {
  invitaitonCode: "",
  email: "",
  mobile: "",
  name: "",
  emailVerificationId: "",
  mobileVerificationCode: "",
  emailVerificationCode: "",
  newPassword: "",
  username: "",
  pin: "",
};

export const onBoardingSlice = createSlice({
  name: "on-boarding",
  initialState: initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },

    setInvitaitonCode: (state, action: PayloadAction<string>) => {
      state.invitaitonCode = action.payload;
    },

    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },

    setEmailVerificationId: (state, action: PayloadAction<string>) => {
      state.emailVerificationId = action.payload;
    },

    setMobile: (state, action: PayloadAction<string>) => {
      state.mobile = action.payload;
    },

    setMobileVerificationCode: (state, action: PayloadAction<string>) => {
      state.mobileVerificationCode = action.payload;
    },

    setEmailVerificationCode: (state, action: PayloadAction<string>) => {
      state.emailVerificationCode = action.payload;
    },

    setPassword: (state, action: PayloadAction<string>) => {
      state.newPassword = action.payload;
    },

    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },

    setPin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
    },

    resetOnBoarding: () => initialState,
  },
});


export const earlyBirdVerifyCode = withLoading(
  async (dispatch, _getState, email: string, invitationCode: string) => {
    await EarlyBirdVerifyCode(email, invitationCode);
    dispatch(onBoardingActions.setEmail(email));
    dispatch(onBoardingActions.setInvitaitonCode(invitationCode));
  }
);

export const checkEmailExist = withLoading(
  async (dispatch, _getState, email: string) => {
    await CheckEmailExist(email);
    dispatch(onBoardingActions.setEmail(email));
  }
);

export const checkPhoneExist = withLoading(
  async (dispatch, _getState, phone: string) => {
    await CheckPhoneExist(phone);
    dispatch(onBoardingActions.setMobile(phone));
  }
);

export const setFullName = (name: string) => (dispatch: Dispatch) => {
  dispatch(onBoardingActions.setName(name));
};

export const sendVerifyCode = withLoading(
  async (
    dispatch,
    _getState,
    action: SendVerifyCodeAction,
    contactType: ContactType,
    contact: string
  ) => {
    await SendVerifyCode(action, contactType, contact);

    if (contactType === ContactType.sms) {
      dispatch(onBoardingActions.setMobile(contact));
    } else {
      dispatch(onBoardingActions.setEmail(contact));
    }
  },
  (error, [, contactType]) => {
    const errorObj = { errorObj: error, type: contactType };
    showConsoleError(`sendVerifyCode---${JSON.stringify(errorObj)}`);
    return errorObj;
  }
);

export const verifyEmailCode = withLoading(
  async (dispatch, getState, pin: string) => {
    const email = getState().onBoarding.email;
    const response = await VerifyEmailCode(email, pin);

    dispatch(onBoardingActions.setEmail(email));
    dispatch(
      onBoardingActions.setEmailVerificationId(
        response?.ResponseData?.toString() || ""
      )
    );
    dispatch(onBoardingActions.setEmailVerificationCode(pin));
  }
);
export const verifyCode = withLoading(
  async (dispatch, getState, pin: string) => {
    const mobile = getState().onBoarding.mobile;

    await VerifyCode(
      SendVerifyCodeAction.register,
      ContactType.sms,
      mobile,
      pin
    );

    dispatch(onBoardingActions.setMobileVerificationCode(pin));
  }
);

export const checkUsernameExist = withLoading(
  async (dispatch, _getState, username: string) => {
    await CheckUsernameExist(username);
    dispatch(onBoardingActions.setUsername(username));
  }
);

export const register = withLoading(async (dispatch, getState) => {
  const state = getState();

  const response = await Register(
    state.onBoarding.username,
    state.onBoarding.name,
    state.onBoarding.email,
    state.onBoarding.newPassword,
    state.onBoarding.pin,
    state.onBoarding.mobile,
    state.onBoarding.mobileVerificationCode,
    state.onBoarding.emailVerificationId,
    state.onBoarding.invitaitonCode
  );

  if (response?.ResponseData) {
    dispatch(loginActions.setLoginResponse(response.ResponseData));
  }

  dispatch(onBoardingActions.resetOnBoarding());
});

export const onBoardingActions = onBoardingSlice.actions;

const onBoardingReducer: Reducer<onBoardingState, UnknownAction> =
  onBoardingSlice.reducer;

export default onBoardingReducer;
