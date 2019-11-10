import React from "react";

const Color = ({ r, g, b }) => {
  const rgb = `rgb(${r},${g},${b})`;
  const colorStyle = {
    backgroundColor: rgb
  };

  var rgbToHex = function(rgb) {
    var hex = Number(rgb).toString(16);
    if (hex.length < 2) {
      hex = "0" + hex;
    }
    return hex;
  };

  var fullColorHex = function(r, g, b) {
    var red = rgbToHex(r);
    var green = rgbToHex(g);
    var blue = rgbToHex(b);
    return red + green + blue;
  };

  return (
    <div className="color-block" style={colorStyle}>
      {fullColorHex(r, g, b)}
    </div>
  );
};

export default Color;
