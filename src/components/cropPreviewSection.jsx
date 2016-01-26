import React from 'react';
import {connect} from 'react-redux';
import CropComponent from './cropComponent';

export default class cropPreviewComponent extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.previewStyle = {
      'width': this.props.cropWidth,
      'height': this.props.cropHeight,
    }
  };

  getCroppedImage(data) {
    return this.refs.cropper.getCroppedImage();
  }

  render() {
    return(
      <div>
        <CropComponent
            ref="cropper"
            scale={this.props.scale}
            width = {this.props.width}
            height = {this.props.height}
            cropWidth = {this.props.cropWidth}
            cropHeight = {this.props.cropHeight}
            action = { this.props.action }
            image={this.props.image} />
        <div className="croped-preview-container">
          <div className="header">Preview</div>
          <img className="crop-preview" src={this.props.preview} style={this.previewStyle} />
        </div>
      </div>
    )
  }
}

export default cropPreviewComponent;
