import Handler from 'usprited/handler'

export class RegionMap {
  constructor() {
    this.map = [];
  }

  add(rect) {
    this.map.push(rect);
  }

  colorFix() {
    this.map.forEach( i => {
      i.colorFix();
    });

    return this.data();
  }

  data() {
    return this.map;
  }

  isColllision(rect) {
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i].isCollision(rect)) {
        return true;
      }
    }
    return false;
  }
}

export class Rect {
  constructor(x,y,w,h) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.selected = false;
    this.key = null;
    this.name = null;
  }

  patch(offset) {
    if (typeof offset.x === 'number') {
      this.x += offset.x;
    }

    if (typeof offset.y === 'number') {
      this.y += offset.y;
    }

    if (typeof offset.w === 'number') {
      this.w += offset.w;
    }

    if (typeof offset.h === 'number') {
      this.h += offset.h;
    }

    return this;
  }

  invert() {
    if (this.w < 1) {
      let x = this.x + this.w;
      this.x = x;
      this.w = this.w * -1;
    }

    if (this.h < 1) {
      let y = this.y + this.h;
      this.y = y;
      this.h = this.h * -1;
    }
    return this;
  }

  fix(w,h) {
    if (this.x < 0) {
      this.x = 0;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.w > w) {
      this.w = w;
    }

    if (this.h > h) {
      this.h = h;
    }

    return this;
  }

  colorFix() {

    if (this.x > 0) {
      this.x += 1;
    }

    if (this.y > 0) {
      this.y += 1;
    }
    this.w += 1;
    this.h += 1;

    return this;
  }

  toArgs() {
    return [this.x, this.y, this.w, this.h];
  }

  isValid() {
    return this.w > 1 && this.h > 1;
  }

  isCollision(rect) {
    return !(this.y + this.h < rect.y || this.y > rect.y + rect.h || this.x + this.w < rect.x || this.x > rect.x + rect.w);
  }
}
