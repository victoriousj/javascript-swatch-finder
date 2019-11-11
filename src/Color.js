import React from "react";

import { copyToClipboard } from "./helpers";

const Color = ({ hex }) => {
  return (
    <div
      onClick={() => copyToClipboard(hex)}
      className="color-block"
      style={{ backgroundColor: `#${hex}` }}
    >
      {hex}
    </div>
  );
};

export default Color;
