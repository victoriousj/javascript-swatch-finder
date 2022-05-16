import React from "react";

import { copyToClipboard, changeBackground } from "./helpers";

const Color = ({ hex, weight }) => {
    const [content, setContent] = React.useState(hex);
    const isMobile = !!(window.innerWidth < 800);
    const size = Math.min(2.5, 1 + weight / 15);
    const emphasis = isMobile ? `${50 * `${size}`}px` : `${80 * `${size}`}px`;

    const colorStyle = {
        backgroundColor: `#${hex}`,
        height: emphasis,
        width: emphasis,
    };

    const clickColor = () => {
        copyToClipboard(hex);
        setContent("copied");
        setTimeout(() => setContent(hex), 400);
    };

    return (
        <div
            onMouseOver={() => changeBackground(hex)}
            className="color-block"
            onClick={clickColor}
            style={colorStyle}
        >
            {content}
        </div>
    );
};

export default Color;
