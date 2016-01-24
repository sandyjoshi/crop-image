import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import FileUploader from './fileUploader';
import CropPreviewSection from './cropPreview';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

const previewSize = {
  width : 512,
  height : 512
}

export default class HomeView extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.state = {
      src: 'public/default.jpg'
    }
  };

  render() {

    var horizontal = {
      cropWidth : 377.5,
      cropHeight :225,
    }

    var vertical = {
      cropWidth : 182.5,
      cropHeight :225,
    }

    var horizontalSmall = {
      cropWidth : 182.5,
      cropHeight :106,
    }

   var gallery = {
      cropWidth : 190,
      cropHeight : 190,
    }

    return(
      <div>
        <div>Image Cropping App</div>
        <FileUploader />
        <CropPreviewSection image={ this.state.src } {...horizontal} {...previewSize} />
        <hr/>
        <CropPreviewSection image={ this.state.src } {...vertical} {...previewSize} />
        <hr/>
        <CropPreviewSection image={ this.state.src } {...horizontalSmall} {...previewSize} />
        <hr/>
        <CropPreviewSection image={ this.state.src } {...gallery} {...previewSize} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

