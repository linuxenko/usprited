import Handler from './handler';

export default class ErrorHandler {
  constructor() {
    Handler.on('warning', this.warning.bind(this));
    Handler.on('error', this.error.bind(this));
  }

  warning(msg) {
    console.log(msg);
  }

  error(msg) {
    console.log(msg);
  }

}
