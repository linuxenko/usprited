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
    Handler.emit('screen-stopediting');
    this.setState({
      isEditing: true
    });

    setTimeout(() => {
      let input = document.getElementById('inline-editor');
      if (input !== null) {
        input.focus();
        input.setSelectionRange(0, input.value.length);
      }
    }, 10);
  }

  unSelect(e) {
    if (e.target.tagName !== 'INPUT' && e.target.className !== 'name') {
      if (document.getElementById('inline-editor') !== null) {
        Handler.emit('screen-stopediting');
      }
    }
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
      <li className={className} onDoubleClick={this.itemClick.bind(this)} onClick={this.unSelect.bind(this)}>
        <span className="count">{this.props.number}</span>
        {(() => {
          if (this.state.isEditing === true) {
            return <input id="inline-editor" type="text" className="name-editing name"
                  onKeyPress={this.setName.bind(this)} onChange={this.setName.bind(this)}
                  defaultValue={this.props.data.name} focus/>
          } else {
            return <span className="name" onClick={this.changeName.bind(this)}>
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
