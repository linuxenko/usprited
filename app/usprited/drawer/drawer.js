import {rgbaToHex} from 'hex-and-rgba';
import Grid from './grid';
import Handler from 'usprited/handler';

export default class Drawer {
  constructor(element, image, color, percentage = 1) {

    this.w = element.width = Math.round(image.width / percentage);
    this.h = element.height = Math.round(image.height / percentage);

    this.image = image;
    this.canvas = element;
    this.ctx = element.getContext('2d');
    this.percentage = percentage;
    this.drawMap = this.drawCanvasMap.bind(this);
    this.bgColor = color || 'dark';

    this.redrawGrid(this.bgColor);

    Handler.emit('canvas-onload', this);
  }

  drawSelection(x,y, w, h) {
    this.ctx.save();
    this.redraw();
    this.ctx.strokeStyle = '#1800E2';
    this.ctx.fillStyle = 'rgba(24, 0, 255, 0.2)';
    this.ctx.fillRect(x, y, w - x, h - y);
    this.ctx.strokeRect(x, y, w - x, h - y);
    this.ctx.restore();
  }

  redraw() {
    this.redrawGrid(this.bgColor);
    this.drawGrid(this.data || []);
  }

  drawCanvasMap(data) {
    this.redrawGrid(this.bgColor);
    this.drawGrid(data);
    this.data = data;
  }

  drawGrid(data) {
    this.ctx.save();

    this.ctx.lineWidth = 1;

      for (let i = 0; i < data.length; i++) {
        let rect = data[i];

        if (rect.selected) {
          this.ctx.strokeStyle = '#DE1382';
          this.ctx.fillStyle = 'rgba(222, 19, 130, 0.2)';
        } else {
          this.ctx.strokeStyle = '#1800E2';
          this.ctx.fillStyle = 'rgba(24, 0, 255, 0.2)';
        }

        this.ctx.fillRect(rect.x, rect.y, rect.w, rect.h);
        this.ctx.strokeRect(rect.x - 1 , rect.y - 1, rect.w + 1, rect.h + 1);
      }

    this.ctx.restore();
  }

  copy() {
    if (this.canvasCopy) {
      return this.canvasCopy;
    }

    this.canvasCopy = document.createElement('canvas');
    this.canvasCopy.width = this.w;
    this.canvasCopy.height = this.h;
    this.canvasCopy.ctx = this.canvasCopy.getContext('2d');
    this.canvasCopy.ctx.drawImage(this.image, 0, 0, this.w, this.h);

    return this.canvasCopy;
  }

  redrawGrid(color) {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.w, this.h);

    if (color === 'white') {
      Grid.whiteGrid(this.ctx, this.w, this.h);
    }

    if (color === 'dark') {
      Grid.darkGrid(this.ctx, this.w, this.h);
    }

    this.ctx.drawImage(this.image, 0, 0, this.w, this.h);
    this.ctx.restore();

    if (this.bgColor !== color && this.data) {
      this.drawGrid(this.data);
    }

    this.bgColor = color;

  }

  pickColor(x,y) {
    let data = this.ctx.getImageData(x, y, 1, 1).data;
    return rgbaToHex(data[0], data[1], data[2]);
  }


}
