import imageConstants from '../constants/image';

export default {
  selectImage(url) {
    return {
      type: imageConstants.SELECT_IMAGE,
      payload: url
    };
  },

  cropHorizontal(url) {
    return {
      type: imageConstants.CROP_HORIZONTAL,
      payload: url
    };
  },

  cropVertical(url) {
    return {
      type: imageConstants.CROP_VERTICAL,
      payload: url
    };
  },

  cropSmallHorizontal(url) {
    return {
      type: imageConstants.CROP_SMALL_HORIZONTAL,
      payload: url
    };
  },


  cropGallery(url) {
    return {
      type: imageConstants.CROP_GALLARY,
      payload: url
    };
  },

  uploadImage() {
    return {
      type: imageConstants.UPLOAD_IMAGES,
    };
  },

};