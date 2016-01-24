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
  height : 512,
  scale : 2
}

export default class HomeView extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.state = {
      src: ''
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
        <header className="app-header">Image Cropping App</header>
        <div className="app-content">
          <FileUploader />
          { (this.state.src ) ? (
            <div>
              <CropPreviewSection image={ this.state.src } {...horizontal} {...previewSize} />
              <hr/>
              <CropPreviewSection image={ this.state.src } {...vertical} {...previewSize} />
              <hr/>
              <CropPreviewSection image={ this.state.src } {...horizontalSmall} {...previewSize} />
              <hr/>
              <CropPreviewSection image={ this.state.src } {...gallery} {...previewSize} />
            </div>
          ) : (<div/>)
          }
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

