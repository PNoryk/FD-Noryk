import { configureStore } from "@reduxjs/toolkit";

import moviesSlice from "@/store/features/moviesSlice.js";
import userSlice from "@/store/features/userSlice.js";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
    user: userSlice,
  },
});
