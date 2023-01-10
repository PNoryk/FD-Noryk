import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { transformMovies } from "@/services/mappers.js";
import { api } from "@/services/movies-api.js";

let initialState = () => {
  let state = {
    defaultS: null,
    s: null,
    entities: [],
    favorites: [],
    totalCount: null,
    loading: "idle",
    error: null,
    currentRequestId: undefined,
  };
  // prettier-ignore
  const searchWords = [
    "cat", "dog", "butterfly", "car", "bad",
    "super", "hero", "girl", "boy", "murder",
    "kill", "bat", "happy", "hello", "chance",
    "clever",
  ];
  let randomWord = searchWords[Math.floor(Math.random() * searchWords.length)];
  state.defaultS = randomWord;
  return state;
};

export const fetchMovies = createAsyncThunk(
  "movies/getAll",
  async ({ page = 1 }, { signal, getState }) => {
    let { s, defaultS } = getState().movies;
    s = (s || null) ?? defaultS;

    let promises = [];
    let pagesToLoad = [...Array(page + 1).keys()].slice(1);
    for (let p of pagesToLoad) {
      promises.push(api.getAll({ requestParams: { s, page: p }, signal }));
    }
    return await Promise.all(promises);
  }
);

export const fetchFavorites = createAsyncThunk(
  "movies/getFavorites",
  async (arg, { signal, getState }) => {
    let favorites = getState().user.favorites;

    let promises = favorites.map((movieId) => api.getById({ movieId, signal }));
    return await Promise.all(promises);
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setS(state, { payload }) {
      state.s = payload || null;
    },
    clearEntities(state) {
      state.entities = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, { meta }) => {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      })
      .addCase(fetchMovies.fulfilled, (state, { payload }) => {
        state.loading = "idle";
        state.currentRequestId = undefined;
        state.entities = transformMovies(
          payload.map((el) => el["Search"]).flat()
        );
        state.totalCount = payload.at(-1)["totalResults"];
      })
      .addCase(fetchMovies.rejected, (state, { error, meta }) => {
        if (
          state.loading === "pending" &&
          meta.requestId === state.currentRequestId
        ) {
          state.loading = "idle";
          state.error = error;
          let isEntitiesEmpty = !state.entities.length;
          if (isEntitiesEmpty) {
            state.totalCount = null;
          }
        }
      })

      .addCase(fetchFavorites.pending, (state, { meta }) => {
        state.loading = "pending";
        state.currentRequestId = meta.requestId;
      })
      .addCase(fetchFavorites.fulfilled, (state, { payload }) => {
        state.loading = "idle";
        state.currentRequestId = undefined;
        state.favorites = transformMovies(payload);
      })
      .addCase(fetchFavorites.rejected, (state, { error, meta }) => {
        if (
          state.loading === "pending" &&
          meta.requestId === state.currentRequestId
        ) {
          state.loading = "idle";
          state.error = error;
        }
      });
  },
});

export default moviesSlice.reducer;
export const { clearEntities, setS } = moviesSlice.actions;

export const getMovies = (store) => store.movies.entities;
export const getMoviesS = (store) => store.movies.s;
export const getMoviesDefaultS = (store) => store.movies.defaultS;
export const getFavorites = (store) => store.movies.favorites;
export const isMoviesLoading = (store) => store.movies.loading === "pending";
export const getMoviesTotalCount = (store) => store.movies.totalCount;
