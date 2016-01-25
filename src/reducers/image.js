import { createReducer }     from '../utils';
import imageConstants from '../constants/image';

const initialState = {
	selectedUrl: '',
	horizontalUrl : '',
	verticalUrl : '',
	horizontalSmallUrl : '',
  gallaryUrl : '',
};

export default createReducer(initialState, {

  [imageConstants.SELECT_IMAGE] : (state, payload) => {
    return Object.assign({}, state, {
      selectedUrl: payload
    });
  },

});