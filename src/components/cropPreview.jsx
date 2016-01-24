import React from 'react';
import {connect} from 'react-redux';
import CropComponent from './cropComponent';

export default class cropPreviewComponent extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
    this.state = {
      preview: ''
    }
  };

  handleSave(data) {
      var img = this.refs.cropper.getCroppedImage();
      this.setState({preview: img });
  }

  render() {
    var buttonStyle = {
        verticalAlign : 'top'
    }

    var styleHorizontal = {
        'width': this.props.cropWidth,
        'height': this.props.cropHeight,
        verticalAlign : 'top'
    }

    return(
      <div>
        <div>Select , Crop & Upload</div>
        <CropComponent
            ref="cropper"
            scale={2}
            width = {512}
            height = {512}
            cropWidth = {this.props.cropWidth}
            cropHeight = {this.props.cropHeight}
            image={this.props.image} />
        <input type="button" onClick={this.handleSave} style={buttonStyle} value="Preview" />
        <img src={this.state.preview} style={styleHorizontal} />
      </div>
    )
  }
}

export default cropPreviewComponent;

