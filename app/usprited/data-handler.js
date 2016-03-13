import {RegionMap, Rect} from 'rextract.js';
import Handler from 'usprited/handler';


export default class DataHandler extends RegionMap {
  constructor() {
    super();


    this.count = 0;

    Handler.on('canvas-onload', () => {
      this.reset();
    });

    Handler.on('data-clean', this.erase.bind(this));
  }


  fireUpdate() {
    Handler.emit('on-data', this.data());
    Handler.emit('on-data-alias', this.data());
  }

  reset() {
    this.count = 0;
    this.map = [];
  }

  nextCount() {
    return (this.count++);
  }

  erase() {
    let all = true, i = this.map.length;

    while(i--) {
      if (this.map[i].selected) {
        all = false;
        this.map.splice(i, 1);
      }
    }

    if (all === true) {
      this.reset();
    }

    this.fireUpdate();
  }

  addMap(map) {
    for (let i = 0; i < map.length; i++) {
      if (this.isColllision(map[i])) {
        continue;
      }

      this.map.push(map[i]);
    }
    this.fireUpdate();
  }

  select(x,y) {
    let rect = {x : x, y : y, w : 1, h : 1};
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i].isCollision(rect)) {
        this.map[i].selected = this.map[i].selected ? false : true;
        this.fireUpdate();
        return;
      }
    }
  }

  add(rect) {
    if (rect === null || this.isColllision(rect)) {
      return;
    }
    this.map.push(rect);
    this.fireUpdate();
  }

  data() {
    for (let i = 0 ; i < this.map.length; i++) {
      if (this.map[i].key === null) {
        this.map[i].key = this.nextCount();
        this.map[i].name = `sprite-${this.map[i].key}`;
      }
    }
    return this.map;
  }

}
