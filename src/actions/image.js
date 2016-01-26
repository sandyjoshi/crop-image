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

  uploadImage(dispatch , imagesArray){

    return (new Promise((resolve, reject) => {

      let imageFormData = new FormData();
      imageFormData.append('horizontal', imagesArray[0]);
      imageFormData.append('vertical', imagesArray[1]);
      imageFormData.append('small_horizontal', imagesArray[2]);
      imageFormData.append('gallery', imagesArray[3]);

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
    })).then(
      function(value) {
        dispatch({
          type: imageConstants.IMAGES_UPLOADED,
          payload: value
        });
      }
    );
  }

};