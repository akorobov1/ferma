import { Cell } from './cell.js';

export class Grid {
  constructor(size = 10) {
    this.size = size;
    this.cells = [];
    this.container = document.getElementById('grid');
    this.init();
  }

  init() {
    for (let y = 0; y < this.size; y++) {
      for (let x = 0; x < this.size; x++) {
        const type = Math.random() < 0.2 ? 'rock' : 'soil';
        const cell = new Cell(x, y, type);
        this.cells.push(cell);
        this.container.appendChild(cell.element);
      }
    }
    this.updateMoisture();
  }

  getNeighbors(cell) {
    return this.cells.filter(c =>
      Math.abs(c.x - cell.x) + Math.abs(c.y - cell.y) <= 2 && c !== cell
    );
  }

  updateMoisture() {
    this.cells.forEach(cell => {
      const neighbors = this.getNeighbors(cell);
      cell.updateMoisture(neighbors);
    });
  }
}
