import React from 'react';
import {connect} from 'react-redux';
import CropComponent from './cropComponent';

export default class cropPreviewComponent extends React.Component {
  static propTypes = {
  };

  getCroppedImage(data) {
    return this.refs.cropper.getCroppedImage();
  }

  render() {
    var styleHorizontal = {
        'width': this.props.cropWidth,
        'height': this.props.cropHeight,
        verticalAlign : 'top'
    }

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
        <div className="crop-details-section">
          <div className="croped-preview-container">
            <div className="header">Preview</div>
            <img src={this.props.preview} style={styleHorizontal} />
          </div>
        </div>
      </div>
    )
  }
}

export default cropPreviewComponent;