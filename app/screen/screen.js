import React from 'react';
import Canvas from './canvas';
import Toolbar from './toolbar/toolbar';
import FileDrop from './filedrop';
import Handler from 'usprited/handler';


export default class Screen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style : null
    }
  }

  componentDidMount() {
    Handler.on('on-colorpick', () => {
      this.setState({
        style : {cursor : 'crosshair'}
      });
    });
    Handler.on('off-colorpick', () => {
      this.setState({
        style : null
      });
    });
  }

  onMouseMove(e) {
    Handler.emit('on-mouse-screen', e.pageX, e.pageY );
  }

  onDragOver(e) {
    e.preventDefault();
    if (typeof e.dataTransfer.files !== 'undefined') {
      Handler.emit('on-fileover');
    }
  }

  onDragLeave(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="application-wrapper"
          style={this.state.style}
          onMouseMove={this.onMouseMove.bind(this)}
          onDragEnter={this.onDragOver.bind(this)}
          onDragLeave={this.onDragLeave.bind(this)}
          >
        <Canvas />
        <FileDrop />
        <Toolbar />
      </div>
    )
  }
}
