import React from "react";

import logo from "./swatch-finder.svg";

const Header = (props) => {
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
      <div>
        <input
          onChange={props.changeSize}
          type="range"
          id="size"
          name="size"
          min="1"
          max="100"
          value={props.state}
        />
        <label htmlFor="volume">Pixel Size </label>
        <span>{props.size}</span>
      </div>
      <div><button onClick={props.downloadImage}>download</button></div>
    </header>
  );
};

export default Header;
