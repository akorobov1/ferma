import { Grid } from './grid.js';
import { ToolManager } from './tools.js';

const grid = new Grid(10);
const tools = new ToolManager(grid);

setInterval(() => {
  grid.cells.forEach(cell => {
  if (cell.type === 'soil') {
    cell.moisture = Math.max(0, cell.moisture - 1);
    cell.updateVisual();
  }
  if (cell.plant) cell.plant.update();
});
}, 2000);