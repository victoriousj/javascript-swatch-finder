import React from "react";

const Color = ({ hex }) => {
  return (
    <div className="color-block" style={{ backgroundColor: `#${hex}` }}>
      {hex}
    </div>
  );
};

export default Color;
