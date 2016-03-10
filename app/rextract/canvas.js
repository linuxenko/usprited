
export default class Canvas {
  constructor(element) {
    this.fixed = false;
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.width = element.width;
    this.canvas.height = element.height;

    this.ctx.drawImage(element, 0, 0);
  }

  fix(color) {
    let image = this.ctx.getImageData(0,0, this.canvas.width, this.canvas.height);

    this.fixed = true;

    this.canvas.width = this.canvas.width + 2;
    this.canvas.height = this.canvas.height + 2;

    this.ctx.save();
    this.ctx.putImageData(image, 1, 1);
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = 2;
    this.ctx.strokeRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.stroke();
    this.ctx.restore();
  }
}
