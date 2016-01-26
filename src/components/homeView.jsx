import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import imageActions from '../actions/image';

import FileSelector from './fileSelect';
import CropPreviewSection from './cropPreviewSection';


const mapStateToProps = (state) => ({
  selectedUrl : state.image.selectedUrl,
  horizontalUrl : state.image.horizontalUrl,
  verticalUrl : state.image.verticalUrl,
  horizontalSmallUrl : state.image.horizontalSmallUrl,
  gallaryUrl : state.image.gallaryUrl,
  pathHorizontal : state.image.pathHorizontal ,
  pathVertical : state.image.pathVertical ,
  pathHorizontalSmall : state.image.pathHorizontalSmall ,
  pathGallary : state.image.pathGallary ,
});

const mapDispatchToProps = (dispatch) => ({
  imageActions : bindActionCreators(imageActions, dispatch),
  dispatch: dispatch
});

const previewSize = {
  width : 512,
  height : 512,
  scale : 2
}

const horizontal = {
  cropWidth : 377.5,
  cropHeight :225,
}

const vertical = {
  cropWidth : 182.5,
  cropHeight :225,
}

const horizontalSmall = {
  cropWidth : 182.5,
  cropHeight :106,
}

const gallery = {
  cropWidth : 190,
  cropHeight : 190,
}


export default class HomeView extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.handleUpload = this.handleUpload.bind(this);
  };

  handleUpload(e){
    e.preventDefault();

    let imagesArray = [];

    let horizontal = this.refs.horizontal.getCroppedImage();
    this.props.imageActions.cropHorizontal(horizontal);
    imagesArray.push(this.props.horizontalUrl);

    let vertical = this.refs.vertical.getCroppedImage();
    this.props.imageActions.cropVertical(vertical);
    imagesArray.push(this.props.verticalUrl);

    let smallHorizontal = this.refs.smallHorizontal.getCroppedImage();
    this.props.imageActions.cropSmallHorizontal(smallHorizontal);
    imagesArray.push(this.props.horizontalSmallUrl);

    let gallery = this.refs.gallery.getCroppedImage();
    this.props.imageActions.cropGallery(gallery);
    imagesArray.push(this.props.gallaryUrl);

    this.props.imageActions.uploadImage( imagesArray);
  }

  render() {

    return(
      <div>
        <header className="app-header">Image Cropping App</header>
        <div className="app-content">
          <FileSelector imageActions={this.props.imageActions} />
          <input type="button" onClick={this.handleUpload} value="Crop & Upload" />
          { (this.props.selectedUrl) ? (
            <div>
              <CropPreviewSection ref="horizontal" action={ this.props.imageActions.cropHorizontal } preview={ this.props.horizontalUrl } image={ this.props.selectedUrl } {...horizontal} {...previewSize} />
              <hr/>
              <CropPreviewSection ref="vertical" action={ this.props.imageActions.cropVertical } preview={ this.props.verticalUrl } image={ this.props.selectedUrl } {...vertical} {...previewSize} />
              <hr/>
              <CropPreviewSection ref="smallHorizontal" action={ this.props.imageActions.cropSmallHorizontal } preview={ this.props.horizontalSmallUrl } image={ this.props.selectedUrl } {...horizontalSmall} {...previewSize} />
              <hr/>
              <CropPreviewSection ref="gallery" action={ this.props.imageActions.cropGallery } preview={ this.props.gallaryUrl } image={ this.props.selectedUrl } {...gallery} {...previewSize} />
            </div>
          ) : (
          <div>
            <div> Uploaded Images </div>
            <img src={this.props.pathHorizontal} height={horizontal.cropHeight} width={horizontal.cropWidth}  />
            <img src={this.props.pathVertical} height={vertical.cropHeight} width={vertical.cropWidth} />
            <img src={this.props.pathHorizontalSmall} height={horizontalSmall.cropHeight} width={horizontalSmall.cropWidth} />
            <img src={this.props.pathGallary} height={gallery.cropHeight} width={gallery.cropWidth} />
          </div>
          )}
        </div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

