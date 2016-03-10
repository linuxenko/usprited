import React from 'react';
import Handler from 'usprited/handler';


export default class Fileopen extends React.Component {

  onChange(e) {
    Handler.emit('on-filedrop', e.target.files[0]);
  }

  render() {
    return (
      <div className="tool-fileopen">
      <label htmlFor="input-file" className="input-label">
        <input type="file" className="input-file"
            id="input-file" name="input-file"  accept="image/*"
            onChange={this.onChange.bind(this)}
            />
          <span className="fa fa-folder-open"></span>
        </label>
      </div>
    )
  }
}
