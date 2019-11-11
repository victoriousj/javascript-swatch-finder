import React from "react";
import "./App.css";

import Color from "./Color";

import { fullColorHex, compareColors } from "./helpers";

const App = () => {
  const [uImage, setUImage] = React.useState("");
  const [colors, setColors] = React.useState([]);
  const canvasRef = React.createRef();
  const inputRef = React.createRef();

  const handleFormClick = () => {
    inputRef.current.click();
  };

  const onChange = e => {
    if (!e.target.files.length) return;

    setColors([]);
    var imgSrc = URL.createObjectURL(e.target.files[0]);
    setUImage(imgSrc);
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    var img = new Image();

    function draw() {
      img.crossOrigin = "anonymous";
      img.src = imgSrc;
      img.onload = () => pixelate();
    }

    function pixelate() {
      var size = 4;

      var height = (canvas.height = img.height);
      var width = (canvas.width = img.width);

      var widthSize = size / width;
      var heightSize = size / height;

      var w = width * widthSize;
      var h = height * heightSize;

      ctx.drawImage(img, 0, 0, w, h);
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);

      let colorArr = [];
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          var c = ctx.getImageData(
            (width / size) * i + width / (size * 2),
            (height / size) * j + height / (size * 2),
            1,
            1
          ).data;

          var color = {
            r: c[0],
            g: c[1],
            b: c[2],
            hex: fullColorHex(c[0], c[1], c[2])
          };

          colorArr.push(color);
        }
      }

      compareColors(colorArr);

      setColors(
        colorArr.map(x => (
          <Color
            key={`${x.r}${x.g}${x.b}`}
            r={x.r}
            g={x.g}
            b={x.b}
            hex={x.hex}
          />
        ))
      );
    }
    draw();
  };

  const image =
    uImage === "" ? (
      <span>click to select an image</span>
    ) : (
      <img className="image-file" src={uImage} alt="click to select a file" />
    );

  return (
    <div>
      <header>
        <h1>Swatch Finder</h1>
        <code>by victor d. johnson</code>
      </header>
      <div className="container">
        <div className="photo-container">
          <div
            className={`photo ${uImage === "" ? "border" : ""}`}
            onClick={handleFormClick}
          >
            {image}
          </div>
        </div>
        <div className="results">
          <div className="color-swatch">{colors}</div>
        </div>
        <canvas ref={canvasRef}></canvas>
        <input
          ref={inputRef}
          type="file"
          name="file-input"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default App;
