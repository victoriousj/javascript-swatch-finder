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

    function draw() {
      img.crossOrigin = "anonymous";
      img.src = imgSrc;
      img.onload = () => pixelate();
    }

    function pixelate() {
      canvas.height = img.height;
      canvas.width = img.width;

      var widthSize = 4 / img.width;
      var heightSize = 4 / img.height;

      var w = canvas.width * widthSize;
      var h = canvas.height * heightSize;

      ctx.drawImage(img, 0, 0, w, h);

      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    }
    draw();
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
