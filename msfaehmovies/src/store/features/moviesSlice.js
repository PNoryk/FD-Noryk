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
  async ({ s, page = 1 }, { signal, getState }) => {
    let loadedPagesSet = new Set(getState().movies.loadedPages);
    if (loadedPagesSet.has(page)) {
      return Promise.reject(PAGE_HAS_BEEN_LOADED);
    }

    let promises = [];
    let pagesToLoad = [...Array(page + 1).keys()]
      .slice(1)
      .filter((p) => !loadedPagesSet.has(p));
    for (let p of pagesToLoad) {
      promises.push(api.getAll({ requestParams: { s, page: p }, signal }));
    }
    return await Promise.all(promises);
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
        let { page } = meta.arg;
        state.loading = "idle";
        state.currentRequestId = undefined;
        state.entities.push(
          ...transformSearchMovie(payload.map((el) => el["Search"]).flat())
        );
        state.totalCount = payload.at(-1)["totalResults"];
        state.loadedPages = [...Array(page + 1).keys()].slice(1);
      })
      .addCase(fetchMovies.rejected, (state, { error, meta }) => {
        if (
          state.loading === "pending" &&
          meta.requestId === state.currentRequestId
        ) {
          state.loading = "idle";
          if (error.message === PAGE_HAS_BEEN_LOADED) {
            state.entities = state.entities.slice(0, meta.arg.page * 10 + 1)
          } else {
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
