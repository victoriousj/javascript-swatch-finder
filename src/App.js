import React from "react";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.canvasRef = React.createRef();
  }
  onSubmit = e => {
    e.preventDefault();
  };

  onChange = e => {
    var imgSrc = URL.createObjectURL(e.target.files[0]);

    // Grab the Canvas and Drawing Context
    var canvas = this.canvasRef.current;
    var ctx = canvas.getContext("2d");

    // Create an image element
    var img = new Image();

    //takes any image URL and creates an un pixelated image /4 the orginal size of the image
    function draw(imgURL) {
      // Specify the src to load the image
      img.crossOrigin = "anonymous";
      img.src = imgURL;

      img.onload = function() {
        if (img.height > 500) {
          const aspectRatio = img.height / img.width;
          img.height = 500;
          img.width = 500 / aspectRatio;
        }

        canvas.height = img.height / 4;
        canvas.width = img.width / 4;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        pixelate();
      };
    }

    //
    function pixelate() {
      //dynamically adjust canvas size to the size of the uploaded image
      canvas.height = img.height;
      canvas.width = img.width;

      /// if in play mode use that value, else use slider value
      var size = 0.007; // blocks.value * 0.01,
      /// cache scaled width and height
      var w = canvas.width * size;
      var h = canvas.height * size;

      /// draw original image to the scaled size
      ctx.drawImage(img, 0, 0, w, h);

      /// then draw that scaled image thumb back to fill canvas
      /// As smoothing is off the result will be pixelated
      ctx.mozImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, w, h, 0, 0, canvas.width, canvas.height);
    }
    draw(imgSrc);
  };

  render() {
    return (
      <div className="container">
        <canvas ref={this.canvasRef} width="200" height="100"></canvas>
        <img src={""} alt="" />
        <form className="form" onSubmit={this.onSubmit}>
          <div>
            <input type="file" name="file-input" onChange={this.onChange} />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
