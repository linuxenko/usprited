import React from 'react';
import DataText from 'usprited/data-text';

export default class PreviewCss extends React.Component {
  render() {
    return (
      <div className="preview-css">
        <textarea value={DataText.toCSS(this.props.data)} readOnly></textarea>
      </div>
    )
  }
}
