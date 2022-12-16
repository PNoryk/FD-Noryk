import "./styles.scss";

import classNames from "classnames";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineUser } from "react-icons/ai";
import { Link, Outlet } from "react-router-dom";
import { useClickAway } from "react-use";

import { ReactComponent as Arrow } from "@/assets/icons/Arrow.svg";
import { ReactComponent as BookmarkIcon } from "@/assets/icons/Bookmark.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/Home.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/Search.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/Setting.svg";
import logoPath from "@/assets/logo.svg";
import { auth, db, signOut } from "@/services/firebase.js";

export const Layout = () => {
  let [isSidebarOpened, setIsSidebarOpened] = useState(false);
  let [isDropDownOpened, setIsDropDownOpened] = useState(false);

  let dropdownRef = useRef(null);
  let closeDropdown = () => setIsDropDownOpened(false);
  useClickAway(dropdownRef, closeDropdown);

  const [user, loading] = useAuthState(auth);
  let [userName, setUserName] = useState("SignOut");
  let userInitials = userName
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  useEffect(() => {
    async function fetchUserName() {
      if (!loading && user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
          // Convert to City object
          const data = docSnap.data();
          // Use a City instance method
          console.log(data);
          return;
        }
        setUserName("Sign In");
      }
    }

    fetchUserName();
  }, [loading, user]);

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
                <span className="dropdown__button-text">{userName}</span>
                <Arrow className="dropdown__arrow" />
              </button>
              <ul className="dropdown__menu">
                {user && (
                  <>
                    <li className="dropdown__menu-item">
                      <button
                        type="button"
                        className="dropdown__link"
                        onClick={() =>
                          signOut().then(() => setUserName("Sign In"))
                        }
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
