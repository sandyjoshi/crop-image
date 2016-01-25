import React from 'react';
import {connect} from 'react-redux';

export default class FileUploader extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.onFileSelect = this.onFileSelect.bind(this);
    this.state = {
      errMsg: '',
      src : '',
      successMsg : ''
    }
  };

  uploadImage(imageFile){

    return new Promise((resolve, reject) => {

      let imageFormData = new FormData();
      imageFormData.append('horizontal', imageFile);
      var xhr = new XMLHttpRequest();
      xhr.open('post', '/image/upload', true);

      xhr.onload = function () {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          reject(this.statusText);
        }
      };

      xhr.send(imageFormData);
    });
  }


  handleSubmit(e){
    e.preventDefault();
    this.uploadImage(this.state.src);
  }

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
        // trigger action.
        this.setState({src: reader.result , errMsg : '' , successMsg : 'Change the Crop area using bellow preview.'});
      };
    };
    reader.readAsDataURL(files[0]);
  }

  render() {
    return(
      <form className="file-uploader" onSubmit={this.handleSubmit.bind(this)}>
        <div className="line">Select image, crop it and upload.</div>
        <input type='file' onChange={this.onFileSelect} />
        <div className="error-message line">{this.state.errMsg}</div>
        <div className="line">{this.state.successMsg}</div>
        <input type="submit" value="Crop & Upload" />
      </form>
    )
  }
}

export default FileUploader;

