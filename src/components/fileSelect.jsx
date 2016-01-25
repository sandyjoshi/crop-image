import React from 'react';
import {connect} from 'react-redux';

export default class FileSelector extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.onFileSelect = this.onFileSelect.bind(this);
    this.state = {
      errMsg: '',
      successMsg : ''
    }
  };

  onFileSelect(e){
    e.preventDefault();

    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }

    var regexImage = /^(image\/jpeg|image\/png|image\/gif|image\/bmp|image\/jpg|image\/pjpeg)$/i;
    if (!regexImage.test(files[0].type)) {
      this.setState({ errMsg : 'Please select a valid image file' , successMsg : '' });
      return;
    }

    let reader = new FileReader();
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;
      image.onload = () => {
        if( image.height !== 1024 && image.width !== 1024 ) {
          this.setState({ errMsg : "Please upload the file of size 1024 * 1024" , successMsg : '' });
          return;
        }
        this.setState({ errMsg : '' , successMsg : 'Change the Crop area using bellow preview.'});
        this.props.imageActions.selectImage(reader.result);
      };
    };
    reader.readAsDataURL(files[0]);
  }

  render() {
    return(
      <div className="file-selector" >
        <div className="line">Select image, crop it and upload.</div>
        <input type='file' onChange={this.onFileSelect} />
        <div className="error-message line">{this.state.errMsg}</div>
        <div className="line">{this.state.successMsg}</div>
      </div>
    )
  }
}

export default FileSelector;

