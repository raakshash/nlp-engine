import React, { Component } from 'react';
import LeftComp from './components/leftComp/leftComp';
import CenterComp from './components/centerComp/centerComp';
import RightComp from './components/rightComp/rightComp';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      intentSelected: {},
      intents: [],
      entities: [],
      isIntentActive: false
    };
    this.updateIntents = this.updateIntents.bind(this);
    this.switchIntentData = this.switchIntentData.bind(this);
  }

  updateIntents() {
    if(this.state.isIntentActive){
      this.switchIntentData();
    }
    fetch('/api/intents')
      .then(res => res.json())
      .then(iIntents => this.setState({ intents: iIntents }))
  }

  switchIntentData(iIntent, event) {
    this.setState({intentSelected: iIntent, isIntentActive: !this.state.isIntentActive });
  }

  render() {
    return (
      <div className="row">
        <LeftComp updateIntents={this.updateIntents} />
        <CenterComp selectedIntent={this.state.intentSelected} intents={this.state.intents} isIntentActive={this.state.isIntentActive} switchIntentData={this.switchIntentData} update={this.updateIntents} />
        <RightComp />
      </div>
    );
  }
}

export default App;
