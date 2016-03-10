import React from 'react';
import DataText from 'usprited/data-text';

export default class PreviewCode extends React.Component {

  render() {
    return (
      <div className="preview-code">
        <textarea value={DataText.toJSON(this.props.data)} readOnly></textarea>
      </div>
    )
  }
}
