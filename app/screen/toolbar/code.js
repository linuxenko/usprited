import React from 'react';

export default class Code extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible : false
    }
  }

  toggle() {
    this.setState({
      isVisible : this.props.toggle()
    })
  }

  render() {
    let className = this.state.isVisible ? "tool-code tool-doublify active" : "tool-code tool-doublify";
    return (
      <div className={className} onClick={this.toggle.bind(this)}>
        <span className="fa fa-code"></span>
      </div>
    )
  }
}
