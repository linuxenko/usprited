import React from 'react';
import PreviewItem from './preview-item';
import Handler from 'usprited/handler';

import PreviewCode from './preview-code';
import PreviewCss from './preview-css';

export default class PreviewItems extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data : Handler.getInstance().data.data(),
      currentPage : 'items',
      itemsClass : 'control active',
      codeClass : 'control',
      cssClass  : 'control'
    };

    this.updateCb = this.update.bind(this);
  }

  update(data) {
    this.setState({ data : data });
  }

  forceUpdate() {
    this.setState({ data : this.state.data });
    Handler.emit('on-data', this.state.data);
  }

  componentDidMount() {
    Handler.on('on-data-alias', this.updateCb);
  }

  componentWillUnmount() {
    Handler.rm('on-data-alias', this.updateCb);
  }

  openPage(page) {
    let state = {
      currentPage : page,
      itemsClass : 'control',
      codeClass : 'control',
      cssClass : 'control'
    };

    switch(page) {
      case('items'):
        state.itemsClass += ' active';
        break;
      case('code'):
        state.codeClass += ' active';
        break;
      case('css'):
        state.cssClass += ' active';
        break;
    }

    this.setState(state);
  }

  render() {
    return (
      <div className="wrapper">
      <div className="root">{this.state.data.length} Sprites
        <div className="controls">
          <span className={this.state.itemsClass} onClick={this.openPage.bind(this, 'items')}>
            <span className="fa fa-pencil-square-o"></span></span>
          <span className={this.state.codeClass} onClick={this.openPage.bind(this, 'code')}>
            <span className="fa fa-code"></span></span>
          <span className={this.state.cssClass} onClick={this.openPage.bind(this, 'css')}>
            <span className="fa fa-css3"></span></span>
        </div>
      </div>
      {(() => {
        if (this.state.currentPage === 'items' && this.state.data.length > 0) {
          return (
            <div className="body">
            <ul className="preview-items">
              {this.state.data.map((item, number) => {
                return <PreviewItem key={item.key} data={item} number={number + 1} up={this.forceUpdate.bind(this)} />
              })}
            </ul>
            </div>
          )
        }

        if (this.state.currentPage === 'code' && this.state.data.length > 0) {
          return (
            <PreviewCode data={this.state.data} />
          )
        }

        if (this.state.currentPage === 'css' && this.state.data.length > 0) {
          return (
            <PreviewCss data={this.state.data} />
          )
        }

        if (this.state.data.length < 1) {
          return (
            <div className="no-items"><span>0 sprites</span></div>
          )
        }

      })()}

      </div>
    )
  }
}
