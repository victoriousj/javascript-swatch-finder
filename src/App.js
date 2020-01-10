import React from "react";
import Color from "./Color";
import Header from "./Header";

import "./App.css";

import { toHex, weighColors } from "./helpers";

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
      img.src = imgSrc;
    }

    function pixelate() {
      const size = 10;
      const height = (canvas.height = img.height);
      const width = (canvas.width = img.width);
      const heightOrWidth = height > width ? height : width;
      const h = (height * size) / heightOrWidth;
      const w = (width * size) / heightOrWidth;

      ctx.drawImage(img, 0, 0, w, h);
      ctx.imageSmoothingEnabled = false;
      ctx.mozImageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);

      const colorArr = [];
      for (let i = 0; i < w; i++) {
        for (let j = 0; j < h; j++) {
          let c = ctx.getImageData(
            (width / w) * i + width / (w * 2),
            (height / h) * j + height / (h * 2),
            1,
            1
          ).data;

          let color = {
            weight: 1,
            hex: toHex(c[0], c[1], c[2])
          };
          colorArr.push(color);
        }
      }
      weighColors(colorArr);
      setColors(
        colorArr
          .slice(0, 15)
          .sort((x, y) => x.weight - y.weight)
          .map(x => <Color {...x} />)
      );
    }
    draw();
    inputRef.current.value = "";
  };

  const imageEl =
    image === "" ? (
      <span>select an image</span>
    ) : (
      <img className="image-file" src={image} alt="select file" />
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
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
        <div className="results">
          <div className="color-swatch">{colors}</div>
        </div>
        <input ref={inputRef} type="file" onChange={onChange} />
      </div>
    </div>
  );
};

export default App;
