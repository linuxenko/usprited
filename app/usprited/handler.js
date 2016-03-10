import CanvasHandler from './canvas-handler';
import ErrorHandler from './error-handler';
import DataHandler from './data-handler';
import Emitter from 'wolfy87-eventemitter';

let instance = null
export default class Handler {
  static getInstance() {
    if (instance === null) {
      instance = new Handler();
    }
    return instance;
  }

  static emit() {
    let emitter = Handler.getInstance().Emitter;
    emitter.emit.apply(emitter, arguments);
  }

  static on() {
    let emitter = Handler.getInstance().Emitter;
    emitter.on.apply(emitter, arguments);
  }

  static once() {
    let emitter = Handler.getInstance().Emitter;
    emitter.once.apply(emitter, arguments);
  }

  static rm() {
    let emitter = Handler.getInstance().Emitter;
    emitter.removeListener.apply(emitter, arguments);
  }

  constructor() {
    this.Emitter = new Emitter();
    this.Emitter.once('application-onload', () => {
      this.canvas = new CanvasHandler();
      this.error = new ErrorHandler();
      this.data = new DataHandler();
    });
  }

}
