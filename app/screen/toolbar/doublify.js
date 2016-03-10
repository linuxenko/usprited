import React from 'react';
import Handler from 'usprited/handler';

export default class Doublify extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isDoublified : false
    }
  }

  componentDidMount() {
    Handler.on('on-filedrop', () => {
      this.setState({isDoublified : false});
    });
  }

  restore() {
    Handler.emit('canvas-restore');
  }

  doublify() {
    Handler.emit('canvas-doublify');
  }

  onClick() {
    if (this.state.isDoublified === false) {
      this.doublify();
      this.setState({isDoublified : true});
    } else {
      this.restore();
      this.setState({isDoublified : false});
    }
  }

  render() {
    let className = this.state.isDoublified ? 'tool-doublify active' : 'tool-doublify';

    return (
        <div className={className} onClick={this.onClick.bind(this)}>
          <span className="fa fa-superscript"></span>
        </div>
    )
  }
}
