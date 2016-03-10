import {Rect} from './region';

export default class Extract {

  makeMap() {
    let width = this.canvas.width;
    let height = this.canvas.height;
    let data = this.ctx.getImageData(0, 0, width, height).data;

    this.colorMap = new Array(width);

    for (let xa = 0; xa < width; xa++) {
      this.colorMap[xa] = new Array(height);
      for (let ya = 0; ya < height; ya++) {
        if (this.color.t === 0) {
          this.colorMap[xa][ya] = data[(xa + ya * width) * 4 + 3] === 0;
        } else {
          this.colorMap[xa][ya] =
            data[(xa + ya * width) * 4] === this.color.r &&
            data[(xa + ya * width) * 4 + 1] === this.color.g &&
            data[(xa + ya * width) * 4 + 2] === this.color.b;
        }
      }
    }
  }

  fromRegion(x, y, w = 1, h = 1) {
    let rect = new Rect(x, y, w, h).invert(),
    offset = {};

    if (typeof this.colorMap === 'undefined') {
      this.makeMap();
    }

    while((offset = this.regionOffset(rect)) !== true) {
        rect.patch(offset);
    }

    rect = this.extractRegion(rect.x, rect.y, rect.w, rect.h);

    if ((rect.w + rect.x >= this.canvas.width && rect.y + rect.h >= this.canvas.height)
        || rect.w < 1 || rect.h < 1)
     {
      return null;
    }

    return rect;
  }

  regionOffset(rect) {
    /* top , left -> right */
    if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y) === true) {
      if (rect.y < this.canvas.height) {
        return {y : 1, h : -1};
      }
    }

    /* left, top -> bottom */
    if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x) === true) {
      if (rect.x < this.canvas.width) {
        return {x : 1, w : -1};
      }
    }

    /* right, top -> bottom */
    if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x + rect.w) === true) {
      if (rect.w > 0) {
        return {w : -1};
      }
    }

    /* bottom, left -> right */
    if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y + rect.h) === true) {
      if (rect.h > 0) {
        return {h : -1};
      }
    }

    return true;
  }

  extractRegion(x, y, w = 1, h = 1) {
    let rect = new Rect(x, y, w, h),
    offset = {};

    if (typeof this.colorMap === 'undefined') {
      this.makeMap();
    }

    while((offset = this.rectOffset(rect)) !== true) {
        rect.patch(offset);
    }

    return rect.fix(this.canvas.width, this.canvas.height);
  }

  rectOffset(rect) {
    /* top , left -> right */
    if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y) === false) {
      if (rect.y > 0) {
        return {y : -1};
      }
    }

    /* left, top -> bottom */
    if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x) === false) {
      if (rect.x > 0) {
        return {x : -1};
      }
    }

    /* right, top -> bottom */
    if (this.isEmptyY(rect.y, rect.y + rect.h, rect.x + rect.w) === false) {
      if (this.canvas.width > rect.w) {
        return {w : 1};
      }
    }

    /* bottom, left -> right */
    if (this.isEmptyX(rect.x, rect.x + rect.w, rect.y + rect.h) === false) {
      if (this.canvas.height > rect.h) {
        return {h : 1};
      }
    }

    return true;
  }

  isEmptyX(start, stop, pointY) {
    for (let x = start; x < stop; x++) {
      if (this.isMapEmpty(x, pointY) === false) {
        return false;
      }
    }
    return true;
  }

  isEmptyY(start, stop, pointX) {
    for (let y = start; y < stop; y++) {
      if (this.isMapEmpty(pointX, y) === false) {
        return false;
      }
    }
    return true;
  }

  isMapEmpty(x,y) {
    if (typeof this.colorMap[x] === 'undefined') {
      return false;
    }
    return this.colorMap[x][y];
  }

}
