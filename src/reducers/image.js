import { createReducer }     from '../utils';
import imageConstants from '../constants/image';

const initialState = {
	selectedUrl: '',
	horizontalUrl : '',
	verticalUrl : '',
	horizontalSmallUrl : '',
  gallaryUrl : '',
  pathHorizontal : '' ,
  pathVertical : '' ,
  pathHorizontalSmall : '' ,
  pathGallary : '' ,
  loading : true,
};

export default createReducer(initialState, {

  [imageConstants.SELECT_IMAGE] : (state, payload) => {
    return Object.assign({}, state, {
      selectedUrl: payload
    });
  },

  [imageConstants.CROP_HORIZONTAL] : (state, payload) => {
    return Object.assign({}, state, {
      horizontalUrl: payload
    });
  },

  [imageConstants.CROP_VERTICAL] : (state, payload) => {
    return Object.assign({}, state, {
      verticalUrl: payload
    });
  },

  [imageConstants.CROP_SMALL_HORIZONTAL] : (state, payload) => {
    return Object.assign({}, state, {
      horizontalSmallUrl: payload
    });
  },

  [imageConstants.CROP_GALLARY] : (state, payload) => {
    return Object.assign({}, state, {
      gallaryUrl: payload
    });
  },

  [imageConstants.UPLOAD_IMAGES] : (state, payload) => {
    return Object.assign({}, state, {
      loading: true
    });
  },

  [imageConstants.IMAGES_UPLOADED] : (state, payload) => {
    return Object.assign({}, state, {
      selectedUrl : '',
      pathHorizontal : payload.horizontal ,
      pathVertical : payload.vertical ,
      pathHorizontalSmall : payload.small_horizontal ,
      pathGallary : payload.gallery ,
      loading : false
    });
  },

});