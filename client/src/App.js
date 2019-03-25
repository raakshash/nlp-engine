import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from './store/actions/mapToProps';
import Login from './components/login/login';
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
        <Login />
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
