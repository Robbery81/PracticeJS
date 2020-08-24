const KEYS = {
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32
};

let game = {
  running: true,
  ctx: null,
  platform: null,
  ball: null,
  blocks: [],
  rows: 4,
  cols: 8,
  score: 0,
  width: 640,
  height: 360,
  sprites: {
    background: null,
    ball: null,
    platform: null,
    block: null,
  },
  sounds: {
    bump: null
  },

  init() {
    this.ctx = document.querySelector('#mycanvas').getContext('2d');
    this.setEvents();
    this.setTextFont();
  },
  setTextFont() {
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '20px Arial';
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
    required += Object.keys(this.sounds).length;

    let onResourseLoad = () => {
      loaded++;
      if (loaded >= required) {
        callback();
      }
    };

    this.preloadSprites(onResourseLoad);
    this.preloadSounds(onResourseLoad);
  },

  preloadSprites(onResourseLoad) {
    for (let key in this.sprites) {
      this.sprites[key] = new Image();
      this.sprites[key].src = `assets/sprites/${key}.png`;
      this.sprites[key].addEventListener('load', onResourseLoad);
    }
  },
  preloadSounds(onResourseLoad) {
    for (let key in this.sounds) {
      this.sounds[key] = new Audio(`assets/sounds/${key}.mp3`);
      this.sounds[key].addEventListener('canplaythrough', onResourseLoad, {
        once: true
      });
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
    this.ball.сollideWorldBounds();
    this.platform.сollideWorldBounds();
    this.platform.move();
    this.ball.move();
    this.сollideBlock();
    this.сollidePlatform();
  },

  сollideBlock() {
    for (let block of this.blocks) {
      if (this.ball.collide(block) && block.active) {
        this.ball.bumbBlock(block);
        this.addScore();
        this.sounds.bump.play();
      }
    }
  },

  сollidePlatform() {
    if (this.ball.collide(this.platform)) {
      this.ball.bumbPlatform(this.platform);
      this.sounds.bump.play();
    }
  },

  run() {
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.update();
        this.render();
        this.run();
      });
    }
  },

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.sprites.background, 0, 0);
    this.ctx.drawImage(this.sprites.ball, this.ball.frame * this.ball.width, 0, this.ball.width, this.ball.height, this.ball.x, this.ball.y, this.ball.width, this.ball.height);
    this.ctx.drawImage(this.sprites.platform, this.platform.x, this.platform.y);
    this.renderBlocks();
    this.ctx.fillText(`Score: ${game.score}`, 15, 20);
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
  },

  end(message) {
    this.running = false;
    alert(message);
    document.location.reload(true);
  },
  addScore() {
    this.score++;
    if (this.score >= this.blocks.length) {
      this.end('WIN!');
    }
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
  frame: 0,

  start() {
    this.dy = -this.velocity;
    this.dx = game.random(-this.velocity, this.velocity);
    this.animate();
  },
  animate() {
    setInterval(() => {
      ++this.frame;
      if (this.frame > 3) {
        this.frame = 0;
      }
    }, 100);
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
    if (platform.dx) {
      this.x += platform.dx;
    }

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
      game.sounds.bump.play();
    } else if (ballRight > worldRight) {
      this.dx = -this.velocity;
      this.x = worldRight - this.width;
      game.sounds.bump.play();
    } else if (ballTop < worldTop) {
      this.dy = this.velocity;
      this.y = worldTop;
      game.sounds.bump.play();
    } else if (ballBottom > worldBotton) {
      game.end('You are lose!');
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
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  },
  stop() {
    this.dx = 0;
  },
  move() {
    if (this.dx) {
      this.x += this.dx;
      if (this.ball) {
        this.ball.x += this.dx;
      }
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
  },
  сollideWorldBounds() {
    let x = this.x + this.dx;

    let platformLeft = x;
    let platformRight = x + this.width;


    let worldLeft = 0;
    let worldRight = game.width;


    if (platformLeft < worldLeft) {
      this.dx = 0;
    } else if (platformRight > worldRight) {
      this.dx = 0;
    }
  },
};

window.addEventListener('load', () => {
  game.start();
});