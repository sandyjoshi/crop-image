import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import imageActions from '../actions/image';

import FileSelector from './fileSelect';
import CropPreviewSection from './cropPreview';


const mapStateToProps = (state) => ({
  selectedUrl : state.image.selectedUrl,
});

const mapDispatchToProps = (dispatch) => ({
  imageActions : bindActionCreators(imageActions, dispatch)
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
          <FileSelector imageActions={this.props.imageActions} />
          { (this.props.selectedUrl) ? (
            <div>
              <CropPreviewSection image={ this.props.selectedUrl } {...horizontal} {...previewSize} />
              <hr/>
              <CropPreviewSection image={ this.props.selectedUrl } {...vertical} {...previewSize} />
              <hr/>
              <CropPreviewSection image={ this.props.selectedUrl } {...horizontalSmall} {...previewSize} />
              <hr/>
              <CropPreviewSection image={ this.props.selectedUrl } {...gallery} {...previewSize} />
            </div>
          ) : (<div/>)
          }
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

