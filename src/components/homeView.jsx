import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default class HomeView extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
  };

  render() {
    return(
      <div>
        Start coding guys
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);

