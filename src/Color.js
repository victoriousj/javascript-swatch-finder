import React from "react";

import { copyToClipboard, changeBackground } from "./helpers";

const Color = ({ hex }) => {
  return (
    <div
      onClick={() => copyToClipboard(hex)}
      onMouseOver={() => changeBackground(hex)}
      className="color-block"
      style={{ backgroundColor: `#${hex}` }}
    >
      {hex}
    </div>
  );
};

export default Color;
