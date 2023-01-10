import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "@/components/card/Card.jsx";
import { Spinner } from "@/components/spinner/Spinner.jsx";
import {
  fetchFavorites,
  getFavorites,
  isMoviesLoading as getIsMoviesLoading,
} from "@/store/features/moviesSlice.js";
import { getUserState } from "@/store/features/userSlice.js";

export const Favorites = () => {
  let [user, isUserLoading] = useSelector(getUserState);
  let movies = useSelector(getFavorites);
  let isMoviesLoading = useSelector(getIsMoviesLoading);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [user?.favorites]);

  return (
    <>
      {isUserLoading || isMoviesLoading ? (
        <Spinner />
      ) : movies.length ? (
        <div className="grid grid--favorites">
          {movies.map((movie) => (
            <Card movie={movie} key={movie.imdbId} showFavorite isFavorite />
          ))}
        </div>
      ) : (
        <h2 className="text-center">No movies available</h2>
      )}
    </>
  );
};
