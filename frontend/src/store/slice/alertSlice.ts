import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface alertState {
  type?: string;
  message?: string;
}

interface AlertSliceState extends alertState {
  isOpen: boolean;
}

const initialState: AlertSliceState = {
  isOpen: false,
  type: undefined,
  message: undefined,
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    open(state, action: PayloadAction<alertState>) {
      state.isOpen = true;
      state.type = action.payload.type || undefined;
      state.message = action.payload.message || undefined;
    },
    close(state) {
      state.isOpen = false;
      state.type = undefined;
      state.message = undefined;
    },
  },
});

export const { open, close } = alertSlice.actions;
export default alertSlice.reducer;
