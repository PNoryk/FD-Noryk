import "./styles.scss";

import { useState } from "react";

import logoPath from "@/assets/logo.svg";

export const Layout = () => {
  let [isSidebarOpened, setIsSidebarOpened] = useState(false);

  return (
    <>
      <header className="header">
        <img className="header__image" src={logoPath} alt="Logo" />
        <button
          className="header__menu-button menu-button"
          aria-expanded={isSidebarOpened}
          onClick={() => setIsSidebarOpened(!isSidebarOpened)}
        >
          <span className="visually-hidden">menu</span>
          <span className="menu-button__item"></span>
          <span className="menu-button__item"></span>
          <span className="menu-button__item"></span>
        </button>
        <input className="header__search search" placeholder="Search" type="text"/>
      </header>
    </>
  );
};
