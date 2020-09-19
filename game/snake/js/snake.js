game.snake = {
  game,
  cells: [],

  create() {
    let startCells = [
      {row: 7, coll:7},
      {row: 8, coll:7},
    ];
    for (let startCell of startCells) {
      let cell = this.game.board.getCell(startCell.row, startCell.coll);
      this.cells.push(cell);
    }
  },

  render() {
    this.cells.forEach(cell => {
      this.game.ctx.drawImage(this.game.sprites.body, cell.x, cell.y);
    });
  },  
};