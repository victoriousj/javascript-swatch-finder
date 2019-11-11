import React from "react";

import logo from "./swatch-finder.svg";

const Header = () => {
  return (
    <header>
      <img className="logo" src={logo} alt="swatch finder logo"></img>
      <div className="header-text">
        <p className="title">Swatch Finder</p>
        <a
          target="_blank"
          className="credit"
          rel="noopener noreferrer"
          href="https://github.com/victoriousj"
        >
          <p>by victor d. johnson</p>
        </a>
      </div>
    </header>
  );
};

export default Header;
