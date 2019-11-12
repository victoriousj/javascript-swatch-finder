import React from "react";
import Color from "./Color";
import Header from "./Header";

import "./App.css";

import { fullColorHex, weighColors } from "./helpers";

const App = () => {
  const handleFormClick = () => inputRef.current.click();
  const [colors, setColors] = React.useState([]);
  const [image, setImage] = React.useState("");
  const canvasRef = React.createRef();
  const inputRef = React.createRef();

  const onChange = e => {
    if (!e.target.files.length) return;

    const imgSrc = URL.createObjectURL(e.target.files[0]);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    setImage(imgSrc);

    function draw() {
      img.onload = () => pixelate();
      img.crossOrigin = "anonymous";
      img.src = imgSrc;
    }

    function pixelate() {
      // The unit used to determine the dimensions
      // of the pixel grid we will create.
      // Higher value means more colors will be found.
      const size = 10;

      const height = (canvas.height = img.height);
      const width = (canvas.width = img.width);
      const h = (height * size) / height;
      const w = (width * size) / width;
      const colorArr = [];

      // Draw the image scaled down to a pixel grid the
      // size of the 'size' variable (e.g., 8 x 8)
      ctx.drawImage(img, 0, 0, w, h);
      // Turn off smoothing so, when upscaled, the image
      // will have hard edges
      ctx.imageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      // Now scale up that small image and the details of
      // most pixels will have been lost, leaving a grid
      // of the most prominent colors in each section.
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);

      // Get the color of the center of each square in our grid.
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          var c = ctx.getImageData(
            (width / size) * i + width / (size * 2),
            (height / size) * j + height / (size * 2),
            1,
            1
          ).data;

          let color = {
            r: c[0],
            g: c[1],
            b: c[2],
            weight: 1,
            hex: fullColorHex(c[0], c[1], c[2])
          };

          colorArr.push(color);
        }
      }
      weighColors(colorArr);
      setColors(colorArr.slice(0, 15).map(x => <Color {...x} key={x.hex} />));
    }
    draw();
  };

  const resetImg = () => {
    setImage("");
    setColors([]);
  };

  const imageEl =
    image === "" ? (
      <span>select an image</span>
    ) : (
      <img
        className="image-file"
        src={image}
        alt="select file"
        onClick={resetImg}
      />
    );

  return (
    <div>
      <Header />
      <div className="container">
        <div className="photo-container">
          <div
            className={`photo ${image === "" ? "border" : ""}`}
            onClick={handleFormClick}
          >
            {imageEl}
          </div>
        </div>
        <div className="results">
          <div className="color-swatch">{colors}</div>
        </div>
        <canvas ref={canvasRef}></canvas>
        <input ref={inputRef} type="file" onChange={onChange} />
      </div>
    </div>
  );
};

export default App;
