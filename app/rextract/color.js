import {rgbaToHex, hexToRgba} from 'hex-and-rgba';

export class Color {
  constructor(color) {
    if (typeof color === 'undefined') {
      this.r = 0;
      this.g = 0;
      this.b = 0;
      this.t = 0;
    } else {
      this.parse(color);
    }
  }

  toHex() {
    return rgbaToHex(this.r, this.g, this.b);
  }

  parse(color) {
    if (typeof color === 'string') {
      let rgbt = hexToRgba(color);
      this.r = rgbt[0];
      this.g = rgbt[1];
      this.b = rgbt[2];
      this.t = 255;
    } else if (typeof color === 'object') {
      this.r = color[0];
      this.g = color[1];
      this.b = color[2];
      this.t = color[3];
    }
  }
}
