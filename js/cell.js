export class Cell {
  constructor(x, y, type = 'soil') {
    this.x = x;
    this.y = y;
    this.type = type; // 'soil', 'water', 'rock'
    this.moisture = type === 'water' ? 100 : 5;
    this.plant = null;
    this.dug = false;
    this.element = document.createElement('div');
    this.element.classList.add('cell');
    this.updateVisual();
  }

  updateMoisture(neighbors) {
    if (this.type === 'soil') {
      let total = 0;
      neighbors.forEach(n => {
        if (n.type === 'water') {
          const dist = Math.abs(n.x - this.x) + Math.abs(n.y - this.y);
          total += Math.max(0, n.moisture - dist * 10);
        }
      });
      this.moisture = Math.min(100, total);
    }
    this.updateVisual();
  }

  updateVisual() {
    this.element.innerHTML = '';
    if (this.type === 'rock') {
      this.element.style.backgroundColor = '#888';
      const img = document.createElement('img');
      img.src = 'assets/rock.png';
      this.element.appendChild(img);
      return;
    }
    if (this.type === 'water') {
      this.element.style.backgroundColor = '#105faeff';
      return;
    }
    if (this.type === 'soil') {
      const color = `rgb(${255 - this.moisture * 2.5}, ${200 - this.moisture * 1.5}, 50)`;
      this.element.style.backgroundColor = color;
    }
    if (this.plant) {
      this.plant.render();
    }
    if (this.dug && this.type === 'soil') {
  const plus = document.createElement('div');
  plus.textContent = '+';
  plus.style.color = 'green';
  plus.style.fontWeight = 'bold';
  plus.style.position = 'absolute';
  plus.style.top = '2px';
  plus.style.left = '2px';
  plus.style.zIndex = '2';
  this.element.appendChild(plus);
}
  }
}