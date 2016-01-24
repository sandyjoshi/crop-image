import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

import FileUploader from './fileUploader';


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

const previewStyle = {
  width : 512,
  height : 512
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
    return(
      <div>
        <div>Image Cropping App</div>
        <FileUploader />
        <img style={previewStyle} src={this.state.src}/>

        <div></div>

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

