import React from "react";

import { copyToClipboard, changeBackground } from "./helpers";

const Color = ({ hex, weight }) => {
  const isMobile = window.innerWidth < 800 ? true : false;
  const emphasis = isMobile
    ? `${50 * `1.${weight}`}px`
    : `${80 * `1.${weight}`}px`;
  const [content, setContent] = React.useState(hex);

  const colorStyle = {
    backgroundColor: `#${hex}`,
    height: emphasis,
    width: emphasis
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
