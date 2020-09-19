game.board = {
  game,
  size: 15,
  cells: [],

  create() {
    this.createCells();
  },

  createCells() {
    for(let row = 0; row < this.size; row++) {
      for(let col = 0; col < this.size; col++) {
        this.cells.push(this.createCell(row, col));
      }
    }
  },

  createCell(row, col) {
    let cellSize = this.game.sprites.cell.width + 1;
    let offsetX = (this.game.width - cellSize * this.size) / 2;
    let offsetY = (this.game.height - cellSize * this.size) / 2;
    
    return {
      row,
      col,
      x: col * cellSize + offsetX,
      y: row * cellSize + offsetY,
    };
  },

  getCell(row, col) {
    return this.cells.find(cell => cell.row === row && cell.col === col);
  },

  render() {
    this.cells.forEach(cell => {
      this.game.ctx.drawImage(this.game.sprites.cell, cell.x, cell.y);
    });
  },  
};