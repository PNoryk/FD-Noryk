import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card } from "@/components/card/Card.jsx";
import { fetchFavorites, getFavorites } from "@/store/features/moviesSlice.js";
import { getUserState } from "@/store/features/userSlice.js";

export const Favorites = () => {
  let [user] = useSelector(getUserState);
  let movies = useSelector(getFavorites);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFavorites());
  }, [user?.favorites]);

  return (
    <div className="grid">
      {movies
        ? movies.map((movie) => <Card movie={movie} key={movie.imdbId} showFavorite isFavorite />)
        : null}
    </div>
  );
};
