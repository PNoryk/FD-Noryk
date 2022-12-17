import "./styles.scss";

import classNames from "classnames";
import { useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { useClickAway } from "react-use";

import { ReactComponent as Arrow } from "@/assets/icons/Arrow.svg";
import { ReactComponent as BookmarkIcon } from "@/assets/icons/Bookmark.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/Home.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/Search.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/Setting.svg";
import logoPath from "@/assets/logo.svg";
import {
  addAllToFavorites as addAllToFavoritesAction,
  getUserState,
  removeAllFromFavorites as removeAllFromFavoritesAction,
  signOut,
} from "@/store/features/userSlice.js";
import { toast } from "react-toastify";
import { getMovies } from "@/store/features/moviesSlice.js";

export const Layout = () => {
  let [isSidebarOpened, setIsSidebarOpened] = useState(false);
  let [isDropDownOpened, setIsDropDownOpened] = useState(false);

  let dropdownRef = useRef(null);
  let closeDropdown = () => setIsDropDownOpened(false);
  useClickAway(dropdownRef, closeDropdown);

  let [user] = useSelector(getUserState);
  let userInitials = user?.userName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  let dispatch = useDispatch();
  let movies = useSelector(getMovies);

  let addAllToFavorites = async () => {
    await dispatch(addAllToFavoritesAction(movies.map(({ imdbId }) => imdbId)))
    toast.success(
      <span>
        <b>{movies.length} movies</b> were successfully added to favorites👍
      </span>
    );
  };

  let removeAllFromFavorites = async () => {
    let favorites = document.querySelector(".grid--favorites");
    if (favorites) {
      favorites.addEventListener("transitionend", () => {
        dispatch(removeAllFromFavoritesAction()).then(() => {
          toast.success(
            <span>
              <b>{user.favorites.length} movies</b> were successfully removed
              from favorites🗑
            </span>
          );
        });
      });
      favorites.classList.add("grid--hidden");
    }
  };

  return (
    <>
      <div
        className={classNames("container", {
          "container--sidebar-opened": isSidebarOpened,
        })}
      >
        <div className="container__main">
          <header className="header">
            <img className="header__image" src={logoPath} alt="Logo" />
            <button
              type="button"
              className="header__menu-button icon-button header-menu"
              aria-expanded={isSidebarOpened}
              onClick={() => setIsSidebarOpened(!isSidebarOpened)}
            >
              <span className="visually-hidden">menu</span>
              <span className="header-menu__item"></span>
              <span className="header-menu__item"></span>
              <span className="header-menu__item"></span>
            </button>
            <div className="header__search search">
              <input
                className="search__input"
                placeholder="Search"
                type="text"
              />
              <button type="button" className="search__button">
                <span className="visually-hidden">search filter button</span>
                <SearchIcon />
              </button>
            </div>
            <div
              ref={dropdownRef}
              className={classNames("header__dropdown", "dropdown", {
                "dropdown--opened": isDropDownOpened,
              })}
            >
              <button
                type="button"
                className="dropdown__button dropdown-button"
                title="Константин Константинопольский"
                onClick={() => setIsDropDownOpened(!isDropDownOpened)}
              >
                <span className="dropdown__button-rect icon-button">
                  {user ? userInitials : <AiOutlineUser size={24} />}
                </span>
                <span className="dropdown__button-text">
                  {user?.userName || "Sign In"}
                </span>
                <Arrow className="dropdown__arrow" />
              </button>
              <ul className="dropdown__menu">
                {user && (
                  <>
                    <li className="dropdown__menu-item">
                      <button
                        type="button"
                        className="dropdown__link"
                        onClick={addAllToFavorites}
                      >
                        Add all to favorites
                      </button>
                    </li>
                    <li className="dropdown__menu-item">
                      <button
                        type="button"
                        className="dropdown__link"
                        onClick={removeAllFromFavorites}
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
                )}
                {!user && (
                  <>
                    <li className="dropdown__menu-item">
                      <Link className="dropdown__link" to={"/signin"}>
                        Sign In
                      </Link>
                    </li>
                    <li className="dropdown__menu-item">
                      <Link className="dropdown__link" to={"/signup"}>
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </header>
          <main>
            <Outlet />
          </main>
        </div>
        <aside className="navbar container__sidebar">
          <img className="navbar__image" src={logoPath} alt="Logo" />
          <nav>
            <ul className="navbar__list">
              <li className="navbar__item">
                <HomeIcon />{" "}
                <Link className="navbar__link" to={"/"}>
                  Home
                </Link>
              </li>
              {/*<li className="navbar__item">*/}
              {/*  <FlameIcon />{" "}*/}
              {/*  <Link className="navbar__link" to={"/trends"}>*/}
              {/*    Trends*/}
              {/*  </Link>*/}
              {/*</li>*/}
              <li className="navbar__item">
                <BookmarkIcon />
                <Link className="navbar__link" to={"/favorites"}>
                  Favorites
                </Link>
              </li>
              <li className="navbar__item">
                <SettingIcon /> Settings
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};
