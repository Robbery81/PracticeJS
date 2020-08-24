const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
};

let game = {
  ctx: null,
  platform: null,
  ball: null,
  blocks: [],
  rows: 4,
  cols: 8,
  width: 640,
  height: 360,
  sprites: {
    background: null,
    ball: null,
    platform: null,
    block: null,
  },

  init() {
    this.ctx = document.querySelector('#mycanvas').getContext('2d');
    this.setEvents();
  },

  setEvents() {
    window.addEventListener('keydown', (e) => {
      //console.log(e.keyCode);
      if (e.keyCode === KEYS.SPACE) {
        this.platform.fire();
      } else if (e.keyCode === KEYS.LEFT || KEYS.RIGHT) {
        this.platform.start(e.keyCode);
      }
    });

    window.addEventListener('keyup', () => {
      this.platform.stop();
    });
  },

  preload(callback) {
    let loaded = 0;
    let required = Object.keys(this.sprites).length;
    let onImageLoad = () => {
      loaded++;
      if (loaded >= required) {
        callback();
      }
    };

    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `assets/sprites/${key}.png`;
      this.sprites[key].addEventListener('load', onImageLoad);

    }
  },

  createLvl() {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        this.blocks.push({
          x: 64 * col + 70,
          y: 24 * row + 35,
          width: 60,
          height: 20,
          active: true
        });
      }
    }
  },

  update() {
    this.platform.tryMove();
    this.ball.move();
    this.сollideBlock();
    this.сollidePlatform();
    this.ball.сollideWorldBounds();
  },

  сollideBlock() {
    for (let block of this.blocks) {
      if (this.ball.collide(block) && block.active) {
        this.ball.bumbBlock(block);
      }
    }
  },

  сollidePlatform() {
    if (this.ball.collide(this.platform)) {
      this.ball.bumbPlatform(this.platform);
    }
  },

  run() {
    window.requestAnimationFrame(() => {
      this.update();
      this.render();
      this.run();
    });
  },

  render() {
    //render
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.ball, 0, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.renderBlocks();

  },

  renderBlocks() {
    for (let block of this.blocks) {
      if (block.active) {
        this.ctx.drawImage(this.sprites.block, block.x, block.y);
      }
    }
  },

  start() {
    this.init();
    this.preload(() => {
      this.createLvl();
      this.run();
    });

  },

  random(min, max) {
    return Math.ceil(Math.random() * (max - min + 1) + min);
  }

};

game.ball = {
  x: 320,
  y: 280,
  width: 20,
  height: 20,
  velocity: 3,
  dy: 0,
  dx: 0,

  start() {
    this.dy = -this.velocity;
    this.dx = game.random(-this.velocity, this.velocity);
  },

  move() {
    if (this.dy) {
      this.y += this.dy;
    }

    if (this.dx) {
      this.x += this.dx;
    }
  },

  collide(element) {
    let x = this.x + this.dx; // coordinate plus accel
    let y = this.y + this.dy;

    if (x + this.width > element.x &&
      x < element.x + element.width &&
      y + this.height > element.y &&
      y < element.y + element.height) {
      return true;
    }

    return false;
  },
  bumbBlock(block) {
    this.dy = -this.dy;
    block.active = false;
  },
  bumbPlatform(platform) {
    if (this.dy > 0) { //ball alredy bump
      this.dy = -this.velocity;
      let touchX = this.x + this.width / 2;
      this.dx = this.velocity * platform.getTouchOfset(touchX);
    }
  },
  сollideWorldBounds() {
    let x = this.x + this.dx;
    let y = this.y + this.dy;

    let ballLeft = x;
    let ballRight = x + this.width;
    let ballTop = y;
    let ballBottom = y + this.height;

    let worldLeft = 0;
    let worldRight = game.width;
    let worldTop = 0;
    let worldBotton = game.height;

    if (ballLeft < worldLeft) {
      this.dx = this.velocity;
      this.x = worldLeft;
    } else if (ballRight > worldRight) {
      this.dx = -this.velocity;
      this.x = worldRight - this.width;
    } else if (ballTop < worldTop) {
      this.dy = this.velocity;
      this.y = worldTop;
    } else if (ballBottom > worldBotton) {
      console.log("lose");
    }
  },
};

game.platform = {
  velocity: 6, //максимальная скорость
  dx: 0, //смещение по оси х в даный момент
  x: 280,
  y: 300,
  width: 100,
  height: 14,
  ball: game.ball,

  start(direction) {
    if (direction === KEYS.LEFT) {
      console.log(this.x);
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  },
  stop() {
    this.dx = 0;
  },
  tryMove() {
    if (this.dx) {
      if (this.dx > 0 && this.x + this.width < game.width - 3) {
        this.move();
      } else if (this.dx < 0 && this.x > 3) {
        this.move();
      }     
    }
  },
  move() {
    this.x += this.dx;
    if (this.ball) {
      this.ball.x += this.dx;
    }
  },
  fire() {
    if (this.ball) {
      this.ball.start();
      this.ball = null;
    }
  },
  getTouchOfset(x) {
    let rightSide = this.x + this.width;
    let diff = rightSide - x; // from touch to rightSidePlatform
    let offset = this.width - diff; // from leftSidePlatform to touch 
    let result = offset * 2 / this.width; //result = [0,2]
    return result - 1; //return = [-1,1]
  }
};

window.addEventListener('load', () => {
  game.start();
});