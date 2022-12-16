import "./styles.scss";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { Card } from "@/components/card/Card.jsx";
import { Spinner } from "@/components/spinner/Spinner.jsx";
import { auth } from "@/services/firebase.js";
import { api } from "@/services/movies-api.js";
import {
  fetchMovies,
  getMovies,
  getMoviesTotalCount,
  isMoviesLoading as isMoviesLoadingAction,
} from "@/store/features/moviesSlice.js";

export const Home = () => {
  const movies = useSelector(getMovies);
  const maxCount = useSelector(getMoviesTotalCount);
  const isMoviesLoading = useSelector(isMoviesLoadingAction);
  const dispatch = useDispatch();

  let isMoreAvailable = movies.length < maxCount;

  let [searchParams, setSearchParams] = useSearchParams();
  let pageSearchParam = parseInt(searchParams.get("page") ?? "1", 10);
  let sSearchParam = searchParams.get("s");
  if (sSearchParam) {
    api.usersS = sSearchParam;
  }
  sSearchParam ??= api.s;
  const [page, setPage] = useState(pageSearchParam);

  useEffect(() => {
    setPage(pageSearchParam);
  }, [pageSearchParam]);

  useEffect(() => {
    let newSearchParams = { s: sSearchParam, page };
    let promise = dispatch(fetchMovies(newSearchParams));
    promise.then(() => setSearchParams(new URLSearchParams(newSearchParams)));
    return () => {
      promise.abort();
    };
  }, [page]);

  const [user, isUserLoading] = useAuthState(auth);

  return (
    <>
      <div className="grid">
        {movies.length
          ? movies.map((movie) => (
              <Card
                movie={movie}
                key={movie.imdbId}
                showFavorite={!isUserLoading && user}
              />
            ))
          : null}
      </div>
      {isMoreAvailable && (
        <p className="text-center">
          <button
            className="show-more"
            disabled={isMoviesLoading}
            onClick={() => setPage((page) => page + 1)}
          >
            Show more {isMoviesLoading && <Spinner />}
          </button>
        </p>
      )}
      <ToastContainer theme="dark" />
    </>
  );
};
