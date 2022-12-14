import { configureStore } from "@reduxjs/toolkit";

import moviesSlice from "@/store/features/moviesSlice.js";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});
