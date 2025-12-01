export class Plant {
  constructor(cell) {
    this.cell = cell;
    this.growth = 0;
    this.dead = false;
    this.image = '';
    this.minMoisture = 0;
    this.maxMoisture = 100;
  }

  update() {
    const m = this.cell.moisture;
    if (m < this.minMoisture || m > this.maxMoisture) {
      this.dead = true;
      this.cell.plant = null;
      this.cell.type = 'rock';
      this.cell.updateVisual();
      return;
    }
    this.growth++;
    this.render();
  }

  render() {
  this.cell.element.innerHTML = '';
  if (!this.dead && this.image) {
    const img = document.createElement('img');
    img.src = this.image;
    this.cell.element.appendChild(img);
  }
}
}

export class Potato extends Plant {
  constructor(cell) {
    super(cell);
    this.image = 'assets/potato.png';
    this.minMoisture = 40;
    this.maxMoisture = 80;
  }
}

export class SwampPlant extends Plant {
  constructor(cell) {
    super(cell);
    this.image = 'assets/swamp.png';
    this.minMoisture = 70;
    this.maxMoisture = 100;
  }
}

export class Cactus extends Plant {
  constructor(cell) {
    super(cell);
    this.image = 'assets/cactus.png';
    this.minMoisture = 0;
    this.maxMoisture = 30;
  }
}