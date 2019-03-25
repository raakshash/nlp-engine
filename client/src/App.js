import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store/actions/mapToProps';
import Authenticate from './components/authenticate/authenticate';
import LeftComp from './components/leftComp/leftComp';
import CenterComp from './components/centerComp/centerComp';
import RightComp from './components/rightComp/rightComp';
import './App.css';

class App extends Component {
  render() {
    if (this.props.isUserLoggedIn) {
      return <div className="row">
        <LeftComp getIntents={this.props.onGetIntents} />
        <CenterComp context={this.props} />
        <RightComp context={this.props} />
      </div>
    } else {
      return (
        <Authenticate context={this.props} />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
