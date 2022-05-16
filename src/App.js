import React, { useEffect, useCallback, useState, createRef } from "react";
import Color from "./Color";
import Header from "./Header";

import "./App.css";
import upload from "./upload.svg";

import { toHex, weighColors, changeBackground } from "./helpers";
let imgSrc;

const App = () => {
  const isMobile = !!(window.innerWidth <= 800);
  const handleFormClick = () => inputRef.current.click();
  const [fileName, setFileName] = useState("");
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(5);
  const photoContainer = createRef();
  const canvasRef = createRef();
  const inputRef = createRef();

  const processImg = useCallback(
    (file) => {
      if (!file && !imgSrc) return;

      if (file) {
        imgSrc = URL.createObjectURL(file);
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      setFileName(file?.name ?? fileName);
      setImage(imgSrc);

      function draw() {
        img.onload = () => pixelate();
        img.src = imgSrc;
      }

      function pixelate() {
        const height = (canvas.height = img.height);
        const width = (canvas.width = img.width);
        const heightOrWidth = height > width ? height : width;
        const h = Math.round((height * size) / heightOrWidth);
        const w = Math.round((width * size) / heightOrWidth);

        ctx.drawImage(img, 0, 0, w, h);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(canvas, 0, 0, w, h, 0, 0, width, height);

        let colorArr = [];
        for (let i = 0; i < w; i++) {
          for (let j = 0; j < h; j++) {
            let c = ctx.getImageData(
              (width / w) * i,
              (height / h) * j,
              1,
              1
            ).data;

            let color = {
              weight: 1,
              hex: toHex(c[0], c[1], c[2]),
            };
            colorArr.push(color);
          }
        }

        weighColors(colorArr);
        colorArr = colorArr.sort((x, y) => x.weight - y.weight);
        changeBackground(colorArr[colorArr.length - 1].hex);
        setColors(
          colorArr.slice(0, 15).map((x) => <Color {...x} key={x.hex} />)
        );
      }
      draw();
    },
    [canvasRef, fileName, size]
  );

  const onChange = (e) => {
    if (!e.target.files.length) return;
    processImg(e.target.files[0]);
  };

  const onDrop = (e) => {
    e.preventDefault();
    if (!e.dataTransfer) return;
    processImg(e.dataTransfer.files[0]);
    photoContainer.current.style.backgroundColor = "rgba(51,51,51,1)";
  };

  const highlight = (e) => {
    e.preventDefault();
    photoContainer.current.style.backgroundColor = "rgba(255,255,255,.3)";
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    photoContainer.current.style.backgroundColor = "rgba(51,51,51,1)";
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };

  useEffect(() => {
    processImg();
  }, [processImg, size]);

  function downloadImage() {
    var a = document.createElement("a");
    a.href = canvasRef.current.toDataURL("image/png");
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
  }

  const imageEl =
    image === "" ? (
      <div>
        <img src={upload} alt={fileName} />
        <div className="image-text">
          <span className="bold">Choose a file</span> &nbsp;
          {!isMobile && "or drag it here"}
        </div>
      </div>
    ) : (
      <img className="image-file" src={image} alt="select file" />
    );

  return (
    <div>
      <Header
        size={size}
        changeSize={changeSize}
        downloadImage={downloadImage}
      />
      <div className="container">
        <div
          ref={photoContainer}
          className="photo-container"
          onDragOver={highlight}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <div
            className={`photo${image === "" ? " border" : ""}`}
            onClick={handleFormClick}
          >
            {imageEl}
            <canvas ref={canvasRef}></canvas>
          </div>
        </div>
        <div className="results">
          <div className="color-swatch">{colors}</div>
        </div>
        <input
          ref={inputRef}
          accept="image/*"
          type="file"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default App;
