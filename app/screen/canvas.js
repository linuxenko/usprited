import React from 'react';
import Handler from 'usprited/handler';


export default class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { w : 0, h : 0};
    this.onload = this.onCanvas.bind(this);
  }

  onCanvas(drawer) {
    this.setState({w : drawer.w, h : drawer.h});
  }

  componentDidMount() {
    Handler.on('canvas-onload', this.onload);
    this.wrapper = document.getElementById('canvas-wrapper');
    this.scrollWrapper = document.getElementById('scroll-wrapper');
  }

  componentWillUnmount() {
    Handler.rm('canvas-onload', this.onload);
  }


  onMouseDown(e) {
    e.preventDefault();
    let x = Math.round(e.pageX + this.scrollWrapper.scrollLeft - this.wrapper.offsetLeft),
    y = Math.round(e.pageY + this.scrollWrapper.scrollTop - this.wrapper.offsetTop);

    if (x < this.state.w && y < this.state.h && x > 0 && y > 0) {
      Handler.emit('canvas-down', x, y);
    }
  }

  onMouseUp(e) {
    let x = Math.round(e.pageX + this.scrollWrapper.scrollLeft - this.wrapper.offsetLeft),
    y = Math.round(e.pageY + this.scrollWrapper.scrollTop - this.wrapper.offsetTop);

    if (x < this.state.w && y < this.state.h && x > 0 && y > 0) {
      Handler.emit('canvas-up', x, y);
    }
  }

  onMouseMove(e) {
    let x = Math.round(e.pageX + this.scrollWrapper.scrollLeft - this.wrapper.offsetLeft),
    y = Math.round(e.pageY + this.scrollWrapper.scrollTop - this.wrapper.offsetTop);

    if (x < this.state.w && y < this.state.h && x > 0 && y > 0) {
      Handler.emit('canvas-move', x, y);
    }
  }

  onClick(e) {
    let x = Math.round(e.pageX + this.scrollWrapper.scrollLeft - this.wrapper.offsetLeft),
    y = Math.round(e.pageY + this.scrollWrapper.scrollTop - this.wrapper.offsetTop);

    if (x > this.state.w || y > this.state.h || x < 0 || y < 0) {
      Handler.emit('off-colorpick');
    } else {
      Handler.emit('canvas-click', x, y);
    }
  }

  onDoubleClick(e) {
    let x = Math.round(e.pageX + this.scrollWrapper.scrollLeft - this.wrapper.offsetLeft),
    y = Math.round(e.pageY + this.scrollWrapper.scrollTop - this.wrapper.offsetTop);

    if (x > this.state.w || y > this.state.h || x < 0 || y < 0) {
      Handler.emit('off-colorpick');
    } else {
      Handler.emit('canvas-dblclick', x, y);
    }
  }

  render() {
    return (
        <div id="scroll-wrapper" className="canvas-wrapper"
          onClick={this.onClick.bind(this)}
          onDoubleClick={this.onDoubleClick.bind(this)}
          onMouseDown={this.onMouseDown.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
          onMouseMove={this.onMouseMove.bind(this)}
          >
          <div id="canvas-wrapper" className="roller">
            <em>{this.state.w}x{this.state.h}</em>
            <canvas id="main-canvas"></canvas>
          </div>
        </div>
    )
  }
}
