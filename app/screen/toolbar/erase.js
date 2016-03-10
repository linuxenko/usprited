import React from 'react';
import Handler from 'usprited/handler';

export default class Erase extends React.Component {

  onClick() {
    Handler.emit('data-clean');
  }

  render() {
    return (
      <div className="tool-erase tool-doublify" onClick={this.onClick.bind(this)}>
        <span className="fa fa-eraser"></span>
      </div>
    )
  }
}
