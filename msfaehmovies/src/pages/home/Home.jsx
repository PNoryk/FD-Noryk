import "./styles.scss";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Spinner } from "@/components/spinner/Spinner.jsx"
import {
  fetchMovies,
  getMovies,
  getMoviesTotalCount,
  isMoviesLoading,
} from "@/store/features/moviesSlice.js";

export const Home = () => {
  const movies = useSelector(getMovies);
  const maxCount = useSelector(getMoviesTotalCount);
  const isLoading = useSelector(isMoviesLoading);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  let isMoreAvailable = movies.length < maxCount;

  useEffect(() => {
    let promise = dispatch(fetchMovies(page));
    return () => {
      promise.abort();
    };
  }, [page]);

  return (
    <>
      <div className="grid">
        {movies.length
          ? movies.map((movie) => (
              <div className="card" key={movie.imdbId}>
                <img
                  className="card__image"
                  src={movie.poster}
                  alt={movie.title + " image"}
                  loading="lazy"
                />
                <h2 className="card__title">{movie.title}</h2>
              </div>
            ))
          : null}
      </div>
      {isMoreAvailable && (
        <p className="text-center">
          <button
            className="show-more"
            disabled={isLoading}
            onClick={() => setPage((page) => page + 1)}
          >
            Show more {isLoading && <Spinner />}
          </button>
        </p>
      )}
    </>
  );
};
