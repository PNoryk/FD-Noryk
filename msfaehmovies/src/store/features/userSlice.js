import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutFirebase,
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "@/services/firebase.js";

const initialState = {
  userId: null,
  userName: null,
  favorites: [],
  isLoading: false,
};

export const addToFavorites = createAsyncThunk(
  "user/addToFavorites",
  async (movieId, { getState }) => {
    let { userId } = getState().user;

    await updateDoc(doc(db, "users", userId), {
      favorites: arrayUnion(movieId),
    });
  }
);

export const addAllToFavorites = createAsyncThunk(
  "user/addToFavorites",
  async (movieIds, { getState }) => {
    let { userId } = getState().user;

    await updateDoc(doc(db, "users", userId), {
      favorites: arrayUnion(...movieIds),
    });
  }
);

export const removeFromFavorites = createAsyncThunk(
  "user/removeFromFavorites",
  async (movieId, { getState }) => {
    let { userId } = getState().user;

    await updateDoc(doc(db, "users", userId), {
      favorites: arrayRemove(movieId),
    });
    return movieId;
  }
);

export const removeAllFromFavorites = createAsyncThunk(
  "user/removeAllFromFavorites",
  async (arg, { getState }) => {
    let { userId } = getState().user;

    await updateDoc(doc(db, "users", userId), {
      favorites: [],
    });
  }
);

const fetchUserData = createAsyncThunk("user/fetchData", async (userId) => {
  let response = await getDoc(doc(db, "users", userId));
  if (response.exists()) {
    return response.data();
  }
});

const setUserData = createAsyncThunk(
  "user/fetchData",
  async ({ userId, data }) => {
    await setDoc(doc(db, "users", userId), data);
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  async ({ email, password }, { dispatch }) => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      let uid = response.user.uid;
      dispatch(fetchUserData(uid));
      return uid;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signUp",
  async ({ name, email, password }, { dispatch }) => {
    try {
      let response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      let { uid: userId } = response.user;
      dispatch(
        setUserData({
          userId,
          data: {
            name,
            email,
          },
        })
      );
      return { userId, name };
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }
);

export const signOut = createAsyncThunk("user/signOut", async () => {
  await signOutFirebase(auth);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.userId = payload;
      })
      .addCase(signIn.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(signOut.fulfilled, () => initialState)

      .addCase(fetchUserData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserData.fulfilled, (state, { payload }) => {
        if (payload) {
          let { name, favorites } = payload;
          state.userName = name;
          state.favorites = favorites;
        }
        state.isLoading = false;
      })

      .addCase(fetchUserData.rejected, (state) => {
        state.userName = "";
        state.favorites = [];
        state.isLoading = false;
      })
      .addCase(signUp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        let { userId, name } = payload;
        state.userName = name;
        state.favorites = [];
        state.userId = userId;
        state.isLoading = false;
      })
      .addCase(signUp.rejected, (state, { error }) => {
        state.error = error;
        state.loading = false;
      })

      .addCase(addToFavorites.fulfilled, (state, { meta }) => {
        let { arg: movieId } = meta;
        state.favorites.push(movieId);
      })

      .addCase(removeFromFavorites.fulfilled, (state, { meta }) => {
        let { arg: movieId } = meta;
        state.favorites = state.favorites.filter((el) => el !== movieId);
      })

      .addCase(removeAllFromFavorites.fulfilled, (state) => {
        state.favorites = [];
      });
  },
});

export default userSlice.reducer;

export const getUserState = (state) => {
  return [
    !state.user.isLoading && state.user.userId ? state.user : null,
    // (!state.user.isLoading && state.user.userId) ? state.user : null,
    state.user.isLoading,
  ];
};
