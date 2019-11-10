import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
  }

  onChange = e => {
    if (!e.target.files.length) return;

    var imgSrc = URL.createObjectURL(e.target.files[0]);
    var canvas = this.canvasRef.current;
    var ctx = canvas.getContext("2d");
    var img = new Image();

    function draw(imgURL) {
      img.crossOrigin = "anonymous";
      img.src = imgURL;
      img.onload = () => {
        canvas.height = img.height / 4;
        canvas.width = img.width / 4;

        pixelate();
      };
    }

    //
    function pixelate() {
      canvas.height = img.height;
      canvas.width = img.width;

      const area = img.height * img.width;

      var size = 0.007;

      if (area > 12000000) {
        size = 0.001;
      } else if (area > 7000000) {
        size = 0.0015;
      } else if (area > 5000000) {
        size = 0.002;
      } else if (area > 1500000) {
        size = 0.00225;
      } else if (area > 900000) {
        size = 0.0025;
      } else if (area > 350000) {
        size = 0.004;
      }

      var w = canvas.width * size;
      var h = canvas.height * size;

      ctx.drawImage(img, 0, 0, w, h);

      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;

      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    }
    draw(imgSrc);
  };

  render() {
    return (
      <div className="container">
        <canvas ref={this.canvasRef}></canvas>
        <input type="file" name="file-input" onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
