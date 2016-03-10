import React from 'react';
import Handler from 'usprited/handler';

export default class PreviewItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isEditing : false
    }

    this.oldName = props.data.name;
    this.stopEditingCb = this.stopEditing.bind(this);
  }

  componentDidMount() {
    Handler.on('screen-stopediting', this.stopEditingCb);
  }

  componentWillUnmount() {
    Handler.rm('screen-stopediting', this.stopEditingCb);
  }

  stopEditing() {
    this.setState({isEditing : false});
  }


  changeName(e) {
    e.preventDefault();
    this.setState({
      isEditing: true
    });
  }

  setName(e) {
    if (e.key === 'Enter') {
      this.setState({
        isEditing : false
      });
      this.props.data.selected = false;
      this.props.up();
    } else {
      if (e.target.value.length > 0) {
        this.props.data.name = e.target.value;
      } else {
        this.props.data.name = this.oldName;
      }
    }
  }

  itemClick(e) {

    e.preventDefault();

    if (this.props.data.selected === true) {
      this.props.data.selected = false;
      this.props.up();
    } else {

      if (this.state.isEditing === false) {
        this.props.data.selected = true;
      }
      this.props.up();
    }

    if (e.target.tagName !== 'INPUT') {
      Handler.emit('screen-stopediting');
    } else {
      this.props.data.selected = false;
    }

  }

  render() {
    let className = this.props.data.selected ? 'preview-item active' : 'preview-item';
    return (
      <li className={className} onClick={this.itemClick.bind(this)} onDoubleClick={this.changeName.bind(this)}>
        <span className="count">{this.props.number}</span>
        {(() => {
          if (this.state.isEditing === true) {
            return <input type="text" className="name-editing name"
                  onKeyPress={this.setName.bind(this)} onChange={this.setName.bind(this)}
                  defaultValue={this.props.data.name} focus/>
          } else {
            return <span className="name">
                      {this.props.data.name}
                    </span>
          }
        })()}
        <em className="rectangle">
          {this.props.data.x} x {this.props.data.y} ({this.props.data.w} x {this.props.data.h})
        </em>
      </li>
    )
  }
}
