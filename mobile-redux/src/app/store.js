import { configureStore } from "@reduxjs/toolkit";
import clientsReducer from "../features/clientsSlice";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
  },
});