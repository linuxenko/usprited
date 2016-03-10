import React from 'react';
import Grid from 'usprited/drawer/grid';
import Handler from 'usprited/handler';

export default class Transparency extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color : 'dark'
    }
  }

  setColor(color) {
    Handler.emit('on-background', color);
    this.setState({color : color});
  }

  render() {
    return (
      <div className="tool-transparency">
        <div className={this.state.color === 'white' ? 'active' : ''}
          onClick={this.setColor.bind(this, 'white')}
          style={{backgroundImage: `url(${Grid.image('white')})`}}>
        </div>
        <div className={this.state.color === 'dark' ? 'active' : ''}
          onClick={this.setColor.bind(this, 'dark')}
          style={{backgroundImage: `url(${Grid.image('dark')})`}}>
        </div>
      </div>
    )
  }
}
