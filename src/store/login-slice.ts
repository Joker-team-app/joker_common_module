import {
  UnknownAction,
  createSlice,
  PayloadAction,
  Reducer,
} from "@reduxjs/toolkit";
import { LoginResponse } from "../api/response_payload/LoginResponseRP.js";
import { withLoading } from "../api/util/apiWrapper.js";
import { APIResponse } from "../api/util/apiUtils.js";
import { login } from "../api/api_request/auth.js";

export interface loginState {
  loginResponse?: LoginResponse;
}

const initialState: loginState = {
  loginResponse: undefined,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLoginResponse: (state, action: PayloadAction<LoginResponse>) => {
      state.loginResponse = action.payload;
    },
    resetOnBoarding: () => initialState,
  },
});

export const loginApi = withLoading(
  async (
    dispatch,
    _getState,
    username: string,
    password: string
  ): Promise<APIResponse<LoginResponse> | null> => {
    const response = await login(username, password);

    if (response?.ResponseData) {
      dispatch(loginActions.setLoginResponse(response.ResponseData));
    }

    return response;
  }
);

export const loginActions = loginSlice.actions;

const loginReducer: Reducer<loginState, UnknownAction> = loginSlice.reducer;

export default loginReducer;

// joker-common-module/src/selectors/loginSelectors.ts
export const loginResponseDetails = (state: any): LoginResponse | undefined =>
  state?.login?.loginResponse;
