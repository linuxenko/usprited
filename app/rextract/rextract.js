import Extract from './extract';
import Canvas  from './canvas';
import {RegionMap, Rect}  from './region';
import {Color} from './color';

export default class Rextract extends Extract {
  constructor(element, color) {
    super();

    this.color = new Color(color);
    this.screen = new Canvas(element);
    this.canvas = this.screen.canvas;
    this.ctx = this.screen.ctx;

    if (color) {
      this.screen.fix(this.color.toHex());
    } else {
      this.screen.fix('rgba(0,0,0,0)');
    }
  }

  detectRegion(x, y) {
    let region = this.extractRegion(x,y);

    if (region.isValid()) {
      return region;
    }

    return null;
  }

  detectAll() {
    let map = new RegionMap(),
        point = new Rect(),
        region = null;

    for (point.x = 1; point.x < (this.canvas.width - 1); point.x += 2) {
      for (point.y = 1; point.y < (this.canvas.height - 1); point.y += 2) {
        if (map.isColllision(point)) {
          continue;
        }

        if ((region = this.detectRegion(point.x, point.y)) !== null) {
            map.add(region);
        }
      }
    }

    return map.data();
  }

}
