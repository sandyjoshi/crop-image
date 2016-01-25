import imageConstants from '../constants/image';

export default {
  selectImage(url) {
    return {
      type: imageConstants.SELECT_IMAGE,
      payload: url
    };
  }
};