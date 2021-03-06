let game = {
  canvas: null,
  ctx: null,
  board: null,
  snake: null,
  width: 0,
  height: 0,
  dimensions: {
    max: {
      width: 640,
      height: 360
    },
    min: {
      width: 300,
      height: 300
    },
  },
  sprites: {
    background: null,
    cell: null,
    body: null,
  },

  start() {
    this.init();

    this.preload(() => {
      this.run();
    });
  },

  init() {
    this.canvas = document.getElementById("mycanvas");
    this.ctx = this.canvas.getContext("2d");
    this.initDimensions();
  },
  initDimensions() {
    let data = {
      maxWidth: this.dimensions.max.width,
      maxHeight: this.dimensions.max.height,
      minWidth: this.dimensions.min.width,
      minHeight: this.dimensions.min.height,
      realWidth: window.innerWidth,
      realHeight: window.innerHeight,
    };
    if (data.realWidth / data.realHeight > data.maxWidth / data.maxHeight) {
      this.fitWidth(data);
    } else {
      this.fitHeight(data);
    }
    
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  },
  fitWidth(data) {
    this.height = Math.round(this.width * data.realHeight / data.realWidth);
    this.height = Math.min(this.height, data.maxHeight);
    this.height = Math.max(this.height, data.minHeight);
    this.width = Math.round(data.realWidth * this.height / data.realHeight);
    this.canvas.style.width = '100%';
  },

  fitHeight(data) {
    this.width = Math.round(data.realWidth * data.realHeight / data.realHeight);
    this.width = Math.min(this.width, data.maxWidth);
    this.width = Math.max(this.width, data.minWidth);
    this.height = Math.round(this.width * data.realHeight / data.realWidth);
    this.canvas.style.height = '100%';
  },

  preload(callback) {
    let loaded = 0;
    let required = Object.keys(this.sprites).length;

    function onAssetLoad() {
      ++loaded;
      if (loaded >= required) {
        
        callback();
      }
    }

    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `img/${key}.png`;
      this.sprites[key].addEventListener('load', onAssetLoad);
    }
  },

  render() {
    this.ctx.drawImage(this.sprites.background, 0, (this.height - this.sprites.background.height) / 2);
    this.board.render();
    this.snake.render();
  },


  run() {
    this.board.create();
    this.snake.create();
    window.requestAnimationFrame(() => {
      this.render();
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  game.start();
});