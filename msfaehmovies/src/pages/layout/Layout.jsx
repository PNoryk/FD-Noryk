import "./styles.scss";

import classNames from "classnames";
import { useState } from "react";

import { ReactComponent as BookmarkIcon } from "@/assets/icons/Bookmark.svg";
import { ReactComponent as FlameIcon } from "@/assets/icons/Flame.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/Home.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/Search.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/Setting.svg";
import logoPath from "@/assets/logo.svg";

export const Layout = () => {
  let [isSidebarOpened, setIsSidebarOpened] = useState(false);

  return (
    <>
      <div className="container">
        <header
          className={classNames(
            "container__main",
            {
              "container__main--aside-opened": isSidebarOpened,
            },
            "header"
          )}
        >
          <img className="header__image" src={logoPath} alt="Logo" />
          <button
            type="button"
            className="header__menu-button menu-button"
            aria-expanded={isSidebarOpened}
            onClick={() => setIsSidebarOpened(!isSidebarOpened)}
          >
            <span className="visually-hidden">menu</span>
            <span className="menu-button__item"></span>
            <span className="menu-button__item"></span>
            <span className="menu-button__item"></span>
          </button>
          <div className="header__search search">
            <input className="search__input" placeholder="Search" type="text" />
            <button type="button" className="search__button">
              <span className="visually-hidden">search filter button</span>
              <SearchIcon />
            </button>
          </div>
        </header>
        <aside
          className={classNames("navbar", "container__sidebar", {
            "container__sidebar--opened": isSidebarOpened,
          })}
        >
          <nav>
            <ul className="navbar__list">
              <li className="navbar__item">
                <HomeIcon /> Home
              </li>
              <li className="navbar__item">
                <FlameIcon /> Trends
              </li>
              <li className="navbar__item">
                <BookmarkIcon /> Favorites
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
