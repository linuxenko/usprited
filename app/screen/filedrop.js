import React from 'react';
import Handler from 'usprited/handler';



export default class FileDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classNames : 'filedrop',
      style : {display: 'none'}
    };
  }

  componentDidMount() {
    Handler.on('on-fileover', () => {
      this.setState({style : {display: 'flex'}});
    });
  }

  resetClass() {
    this.setState({classNames : 'filedrop'});
  }

  hideMe() {
    this.setState({style : {display: 'none'}});
  }

  preventDefault(e) {
    e.preventDefault();
  }

  dragStart(e) {
    e.preventDefault();
    this.setState({classNames : 'filedrop active'});
  }

  drop(e) {
    e.preventDefault();
    this.hideMe();
    Handler.emit('on-filedrop', e.dataTransfer.files[0]);
  }

  render() {
    return (
      <div className="filedrop-wrapper" style={this.state.style}
        onDragOver={this.preventDefault}
        onDrop={this.preventDefault.bind(this)}
        onClick={this.hideMe.bind(this)}
        >
        <div className={this.state.classNames} onDragOver={this.dragStart.bind(this)}
          onDragLeave={this.resetClass.bind(this)} onDrop={this.drop.bind(this)}>
          Drop your file here.
        </div>
      </div>
    )
  }
}
