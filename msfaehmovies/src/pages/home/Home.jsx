import "./styles.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { Card } from "@/components/card/Card.jsx";
import { Spinner } from "@/components/spinner/Spinner.jsx";
import {
  clearEntities,
  fetchMovies,
  getMovies,
  getMoviesDefaultS,
  getMoviesS,
  getMoviesTotalCount,
  isMoviesLoading as isMoviesLoadingAction,
  setS,
} from "@/store/features/moviesSlice.js";
import { getUserState } from "@/store/features/userSlice.js";

export const Home = () => {
  const movies = useSelector(getMovies);
  const maxCount = useSelector(getMoviesTotalCount);
  const isMoviesLoading = useSelector(isMoviesLoadingAction);
  const moviesDefaultS = useSelector(getMoviesDefaultS);
  const moviesS = useSelector(getMoviesS);
  const dispatch = useDispatch();

  let isMoreAvailable = movies.length < maxCount;

  let [searchParams, setSearchParams] = useSearchParams();
  let pageSearchParam = parseInt(searchParams.get("page") ?? "1", 10);
  let sSearchParam = searchParams.get("s");

  const [page, setPage] = useState(pageSearchParam);

  useEffect(() => {
    if (sSearchParam !== moviesDefaultS) {
      dispatch(setS(sSearchParam));
    }
  }, []);

  useEffect(() => {
    dispatch(clearEntities());
    setPage(1)
  }, [moviesS]);

  useEffect(() => {
    setSearchParams(
      new URLSearchParams({
        s:
          moviesS === null
            ? moviesDefaultS
            : moviesS || sSearchParam || moviesDefaultS,
        page: page,
      })
    );
  }, [moviesS, sSearchParam, moviesDefaultS, page]);

  useEffect(() => {
    let promise = dispatch(fetchMovies({ page }));
    return () => {
      promise.abort();
    };
  }, [page, moviesS]);

  let [user] = useSelector(getUserState);
  const userFavorites = new Set(user?.favorites); // Set is for fast search – O(1)

  return (
    <>
      {!movies.length && isMoviesLoading ? (
        <Spinner />
      ) : (
        <>
          {movies.length ? (
            <div className="grid">
              {movies.map((movie) => (
                <Card
                  movie={movie}
                  key={movie.imdbId}
                  showFavorite={!!user}
                  isFavorite={userFavorites.has(movie.imdbId)}
                />
              ))}
            </div>
          ) : (
            <p style={{ marginTop: 0 }}>No movies found</p>
          )}
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
        </>
      )}
    </>
  );
};
