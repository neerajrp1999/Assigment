import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "@/store/slice/alertSlice";

export const store = configureStore({
  reducer: {
    alert: alertReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
