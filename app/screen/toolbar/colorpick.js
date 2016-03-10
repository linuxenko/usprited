import React from 'react';
import Grid from 'usprited/drawer/grid';
import Handler from 'usprited/handler';

export default class Colorpick extends React.Component {

  constructor(props) {
    super(props);

    this.transparentStyle = { backgroundImage: `url(${Grid.image('white')})` };
    this.canvas = Handler.getInstance().canvas;

    this.state = {
      style : this.transparentStyle,
      className : null,
      isActive : false
    };
  }

  componentDidMount() {
    Handler.on('off-colorpick', () => {
      let style = this.transparentStyle;

      if (this.canvas.detectColor !== null) {
        style = { background : this.canvas.detectColor};
      }

      this.setState({
        style : style,
        className : null,
        isActive : false
      });
    });
  }

  onClick() {
    if (this.state.isActive === false) {
      this.setState({
        className : 'active',
        isActive : true
      });

      this.canvas.detectColor = null;

      Handler.emit('on-colorpick');
      Handler.once('canvas-click', (x,y) => {
        if (this.state.isActive === true) {
          this.canvas.detectColor = this.canvas.drawer.pickColor(x,y);
          Handler.emit('off-colorpick');
        }
      });
    }

    if (this.state.isActive === true) {
      Handler.emit('off-colorpick');
    }
  }

  render() {
    return (
        <div className="tool-colorpick">
        <div
          className={this.state.className}
          style={this.state.style} onClick={this.onClick.bind(this)}>
          <span style={this.transparentStyle}></span></div>
        </div>
    )
  }
}
