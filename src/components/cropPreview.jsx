import React from 'react';
import {connect} from 'react-redux';
import CropComponent from './cropComponent';

export default class cropPreviewComponent extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.handleSave = this.handleSave.bind(this);
  };

  handleSave(data) {
    var img = this.refs.cropper.getCroppedImage();
    this.setState({preview: img });
  }

  getCroppedImage(data) {
    return this.refs.cropper.getCroppedImage();
  }

  render() {
    var buttonStyle = {
        verticalAlign : 'top',
        margin : 10
    }

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
          <div>
            <input type="button" onClick={this.handleSave} style={buttonStyle} value="Generate Preview" />
          </div>
          <div> &lt;&lt;----------- </div>
          <br/>
          <ol className="inst-list">
            <li className="inst-item" >change crop area in left section </li>
            <li className="inst-item">Hit "Generate Preview" Button & see Preview</li>
          </ol>
        </div>
      </div>
    )
  }
}

export default cropPreviewComponent;

