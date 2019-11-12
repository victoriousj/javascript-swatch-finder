export const weighColors = colorArr => {
  for (let i = 0; i < colorArr.length; i++) {
    let color = colorArr[i];
    for (let j = i + 1; j < colorArr.length; j++) {
      let color2 = colorArr[j];
      if (colorDelta(color.hex, color2.hex) > 0.91) {
        color.weight += color2.weight;
        colorArr.splice(j--, 1);
      }
    }
  }
};

export const colorDelta = (hex1, hex2) => {
  // get red/green/blue int values of hex1
  var r1 = parseInt(hex1.substring(0, 2), 16);
  var g1 = parseInt(hex1.substring(2, 4), 16);
  var b1 = parseInt(hex1.substring(4, 6), 16);
  // get red/green/blue int values of hex2
  var r2 = parseInt(hex2.substring(0, 2), 16);
  var g2 = parseInt(hex2.substring(2, 4), 16);
  var b2 = parseInt(hex2.substring(4, 6), 16);
  // calculate differences between reds, greens and blues
  var r = 255 - Math.abs(r1 - r2);
  var g = 255 - Math.abs(g1 - g2);
  var b = 255 - Math.abs(b1 - b2);
  // limit differences between 0 and 1
  r /= 255;
  g /= 255;
  b /= 255;
  // 0 means opposit colors, 1 means same colors
  return (r + g + b) / 3;
};

const rgbToHex = function(rgb) {
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
    hex = "0" + hex;
  }
  return hex;
};

export const fullColorHex = function(r, g, b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return red + green + blue;
};

export const copyToClipboard = str => {
  const el = document.createElement("textarea");
  el.value = `#${str}`;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
};

export const changeBackground = str => {
  document.body.style.backgroundColor = `#${str}`;
};
