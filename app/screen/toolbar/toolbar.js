import React from 'react';
import Handler from 'usprited/handler';
import Transparency from './transparency';
import Colorpick from './colorpick';
import Doublify from './doublify';
import Detect from './detect';
import Fileopen from './fileopen';
import Code from './code';
import Erase from './erase';
import Preview from './preview';

export default class ToolBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      barPosition : {},
      isPreview : false,
      hidden : false,
      dragging : false
    };

    Handler.on('on-mouse-screen', this.moveBar.bind(this));
  }

  startDrag(e) {
    this.setState({dragging : true});
  }

  stopDrag() {
    this.setState({dragging : false});
  }

  moveBar(x, y) {
    if (this.state.dragging === true) {
      this.setState({
        barPosition: {
          left: x - 10 + 'px',
          top : y - 10 + 'px'
        }
      });
    }
  }

  toggle() {
    if (this.state.hidden === false) {
      this.setState({
        hidden : true,
      });
    } else {
      this.setState({
        hidden : false,
      });
    }
  }

  togglePreview() {
    if (this.state.isPreview === false) {
      this.setState({isPreview : true});
      return true;
    } else {
      this.setState({isPreview : false});
      return false;
    }
  }


  render() {
    let className = this.state.hidden ? 'toolbar hidden' : 'toolbar';
    let preview = this.state.isPreview ? <Preview /> : '';
    return (
      <div className={className} style={this.state.barPosition}>
        <div className="header">
          <span className="movable" onMouseDown={this.startDrag.bind(this)} onMouseUp={this.stopDrag.bind(this)}>
            <span></span>
            <span></span>
            <span></span>
          </span>
          <span className="close" onClick={this.toggle.bind(this)}></span>
        </div>
        <div className="body">
          <Fileopen />
          <Doublify />
          <Detect />
          <Erase />
          <Code toggle={this.togglePreview.bind(this)} />
          <span className="spacer"></span>
          <Transparency />
          <span className="spacer"></span>
          <Colorpick />
          {preview}
        </div>
      </div>
    )
  }
}
