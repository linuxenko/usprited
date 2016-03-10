import React from 'react';
import Handler from 'usprited/handler';

export default class Detect extends React.Component {

  onClick() {
    Handler.emit('canvas-detect');
  }

  render() {
    return (
      <div className="tool-detect" onClick={this.onClick.bind(this)}>
        <span className="fa fa-search"></span>
      </div>
    )
  }
}
