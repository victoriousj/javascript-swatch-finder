import React from "react";

import logo from "./swatch-finder.svg";
import download from "./download.svg";

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
            {props.hasImage && (
                <div
                    hidden={props.hasImage}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                    }}
                >
                    <div>
                        <input
                            onChange={props.changeSize}
                            type="range"
                            id="size"
                            name="size"
                            min="1"
                            max="20"
                            value={props.size}
                        />
                        <label htmlFor="volume">Pixel Size </label>
                        <span>{props.size}</span>
                    </div>
                    <div style={{ marginLeft: "20px" }}>
                        <button
                            className="download-button"
                            onClick={props.downloadImage}
                        >
                            download
                            <img src={download} alt={"download"} />
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
