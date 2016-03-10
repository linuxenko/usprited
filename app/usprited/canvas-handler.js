import Drawer from './drawer/drawer';
import Logo from 'screen/image/usprited.png';
import Handler from 'usprited/handler';
import Rextract from 'rextract/rextract';


export default class CanvasHandler {
  constructor() {
    this.url = null;
    this.color = null;
    this.drawer = null;
    this.detectColor = null;
    this.eventDown = null;
    this.pickerLock = false;

    this.setupDrawerEvents();

    Handler.on('on-filedrop', this.fromFile.bind(this));
    Handler.on('on-background', this.setGridColor.bind(this));
    Handler.on('canvas-doublify', this.resize.bind(this, 2));
    Handler.on('canvas-restore', this.resize.bind(this, 1));

    //Handler.on('canvas-click', this.detectRegion.bind(this));
    Handler.on('canvas-detect', this.detectAll.bind(this));
    Handler.on('on-colorpick', () => { this.pickerLock = true; });
    Handler.on('off-colorpick', () => { this.pickerLock = false; });

    this.create(Logo);
  }

  setupDrawerEvents() {
    Handler.on('canvas-down', (x, y) => {
      if (this.pickerLock === true) {
        return;
      }
      this.eventDown = { x : x , y : y};
      this.detectRegion(x, y);
    });
    Handler.on('canvas-up', (x, y) => {
      if (this.pickerLock === true) {
        return;
      }
      let rect = { x : this.eventDown.x, y : this.eventDown.y, w : x - this.eventDown.x, h : y - this.eventDown.y },
      dh = Handler.getInstance().data,
      rex = new Rextract(this.drawer.copy(), this.detectColor || undefined);

      dh.add(rex.fromRegion(rect.x, rect.y, rect.w, rect.h));
      this.eventDown = null;
      this.drawer.redraw();
    });

    Handler.on('canvas-move', (x, y) => {
      if (this.pickerLock === true) {
        return;
      }
      if (this.eventDown !== null) {
        this.drawer.drawSelection(this.eventDown.x, this.eventDown.y, x, y);
      }
    });
  }

  detectAll() {
    let rex = new Rextract(this.drawer.copy(), this.detectColor || undefined);
    Handler.getInstance().data.addMap(rex.detectAll());
  }

  detectRegion(x, y) {
    let dh = Handler.getInstance().data;

    if (dh.isColllision({x : x, y : y, w : 1, h : 1})) {
      dh.select(x, y);
    }
  }

  setGridColor(color) {
    this.color = color;
    this.drawer.redrawGrid(color);
  }

  create(url) {
    this.url = url;
    let image = document.createElement('img');
    image.onload = () => this.createScreen(image);
    image.src = url;
  }

  createScreen(image) {
    if (this.drawer !== null) {
      Handler.rm('on-data', this.drawer.drawMap);
      Handler.emit('data-clean');
    }

    this.drawer = new Drawer(
      document.getElementById('main-canvas'),
      image,
      this.color
    );

    Handler.on('on-data', this.drawer.drawMap);
  }

  resize(percentage) {
    if (this.drawer !== null) {
      Handler.rm('on-data', this.drawer.drawMap);
      Handler.emit('data-clean');
    }

    this.drawer = new Drawer(
          document.getElementById('main-canvas'),
          this.drawer.image,
          this.color,
          percentage
        );

    Handler.on('on-data', this.drawer.drawMap);
  }

  fromFile(file) {
    if (!file || !file.type.match(/^image\/.*$/)) {
      Handler.emit('warning', 'File format not supported');
      return;
    }
    let reader = new FileReader();
    reader.onload = () => this.create(reader.result);
    reader.readAsDataURL(file);
  }
}
