import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { getMovies } from "@/store/features/moviesSlice.js";
import {
  addAllToFavorites,
  getUserState,
  removeAllFromFavorites,
  signOut,
} from "@/store/features/userSlice.js";

export const DropdownFavorites = () => {
  let dispatch = useDispatch();
  let movies = useSelector(getMovies);
  let [user] = useSelector(getUserState);

  let onAddAllToFavorites = async () => {
    await dispatch(addAllToFavorites(movies.map(({ imdbId }) => imdbId)));
    toast.success(
      <span>
        <b>{movies.length} movies</b> were successfully added to favorites👍
      </span>
    );
  };

  let onRemoveAllFromFavorites = async () => {
    let favorites = document.querySelector(".grid--favorites");
    if (favorites) {
      favorites.classList.add("grid--hidden");
      favorites.addEventListener("transitionend", () => {
        dispatch(removeAllFromFavorites()).then(() => {
          toast.success(
            <span>
              <b>{user.favorites.length} movies</b> were successfully removed
              from favorites🗑
            </span>
          );
        });
      });
    }
  };
  return (
    <>
      <li className="dropdown__menu-item">
        <button
          type="button"
          className="dropdown__link"
          onClick={onAddAllToFavorites}
        >
          Add all to favorites
        </button>
      </li>
      <li className="dropdown__menu-item">
        <button
          type="button"
          className="dropdown__link"
          onClick={onRemoveAllFromFavorites}
        >
          Remove all from favorites
        </button>
      </li>
      <li className="dropdown__menu-item">
        <button
          type="button"
          className="dropdown__link"
          onClick={() => dispatch(signOut())}
        >
          Sign out
        </button>
      </li>
    </>
  );
};
