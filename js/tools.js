import { Potato, SwampPlant, Cactus } from './plant.js';

export class ToolManager {
  constructor(grid) {
    this.grid = grid;
    this.selectedTool = 'shovel';
    this.selectedPlant = null;
    this.bindUI();
  }

  bindUI() {
    document.querySelectorAll('#toolbar button').forEach(btn => {
      btn.addEventListener('click', () => {
        this.selectedTool = btn.dataset.tool;
        this.selectedPlant = {
          cactus: Cactus,
          swamp: SwampPlant,
          potato: Potato
        }[btn.dataset.plant] || null;
        document.body.dataset.tool = this.selectedTool;
      });
    });

    this.grid.cells.forEach(cell => {
      cell.element.addEventListener('click', () => this.useTool(cell));
    });
  }

  useTool(cell) {
    switch (this.selectedTool) {
      case 'shovel':
        if (cell.plant) {
          cell.plant = null;
        } else if (cell.type === 'rock') {
          cell.type = 'soil';
          cell.dug = false;
        } else if (cell.type === 'soil') {
          cell.dug = true;
        }
        cell.updateVisual();
        break;

      case 'bucket':
  if (cell.type === 'rock') return; // нельзя поливать камень

  if (cell.type === 'water') {
    cell.moisture = Math.min(100, cell.moisture + 30);
  } else {
    cell.type = 'water';
    cell.moisture = 100;
  }

  cell.updateVisual();
  this.grid.updateMoisture();
  break;



      case 'seeds':
  if (
    cell.type === 'soil' &&
    cell.dug &&
    !cell.plant &&
    this.selectedPlant
  ) {
    const tempPlant = new this.selectedPlant(cell);
    const m = cell.moisture;
    if (m >= tempPlant.minMoisture && m <= tempPlant.maxMoisture) {
      cell.plant = tempPlant;
      cell.plant.render();
    }
  }
  break;
    }
  }
}
