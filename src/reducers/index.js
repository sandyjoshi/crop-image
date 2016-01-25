import {
  combineReducers
}
from 'redux';
import {
  routerStateReducer
}
from 'redux-router';
import image from './image';

export default combineReducers({
  image,
  router: routerStateReducer
});
