import {
  createSlice,
  PayloadAction,
  Reducer,
  UnknownAction,
} from "@reduxjs/toolkit";

export interface LoadingState {
  isLoading: boolean;
}

const initialState: LoadingState = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
const loadingReducer: Reducer<LoadingState, UnknownAction> =
  loadingSlice.reducer;

export default loadingReducer;
