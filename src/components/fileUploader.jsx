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
      src : ''
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
      this.setState({ errMsg : 'Please select a valid image file' });
      return;
    }

    let reader = new FileReader();
    reader.onload = () => {
      var image = new Image();
      image.src = reader.result;
      image.onload = () => {
        if( image.height !== 1024 && image.width !== 1024 ) {
          this.setState({ errMsg : "Please upload the file of size 1024 * 1024" });
          return;
        }
        // trigger action.
        this.setState({src: reader.result , errMsg : ''});
      };
    };
    reader.readAsDataURL(files[0]);
  }

  render() {
    return(
      <div>
        <input type='file' onChange={this.onFileSelect} />
        <span className="error-message">{this.state.errMsg}</span>
      </div>
    )
  }
}

export default FileUploader;

