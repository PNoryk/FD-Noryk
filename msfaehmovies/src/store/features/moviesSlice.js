import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { transformSearchMovie } from "@/services/mappers.js";
import { api } from "@/services/movies-api.js";

let initialState = {
  entities: [],
  totalCount: null,
  loading: "idle",
  error: null,
  currentRequestId: undefined,
  loadedPages: [],
};

const PAGE_HAS_BEEN_LOADED = "page-has-been-loaded";

export const fetchMovies = createAsyncThunk(
  "movies/getAll",
  async (page = 1, { signal, getState }) => {
    let { loadedPages } = getState().movies;
    if (loadedPages.includes(page)) {
      return Promise.reject(PAGE_HAS_BEEN_LOADED);
    }
    return await api.getAll({ requestParams: { page }, signal });
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, { meta }) => {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      })
      .addCase(fetchMovies.fulfilled, (state, { payload, meta }) => {
        state.loading = "idle";
        state.currentRequestId = undefined;
        state.entities.push(...transformSearchMovie(payload["Search"]));
        state.totalCount = payload["totalResults"];
        state.loadedPages.push(meta.arg);
      })
      .addCase(fetchMovies.rejected, (state, { error, meta }) => {
        if (
          state.loading === "pending" &&
          meta.requestId === state.currentRequestId
        ) {
          state.loading = "idle";
          if (error.message !== PAGE_HAS_BEEN_LOADED) {
            state.error = error;
          }
        }
      });
  },
});

export default moviesSlice.reducer;

export const getMovies = (store) => store.movies.entities;
export const isMoviesLoading = (store) => store.movies.loading === "pending";
export const getMoviesTotalCount = (store) => store.movies.totalCount;
