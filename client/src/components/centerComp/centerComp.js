import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../container/centerComp/centerComp';
import './centerComp.css';

import IntentList from './intents/intents';
import Intent from './intents/intent/intent';

class CenterComp extends Component {
    constructor() {
        super();
        this.renderIntents = this.renderIntents.bind(this);
        this.createWebserviceUserGuide = this.createWebserviceUserGuide.bind(this);
    }
    createWebserviceUserGuide() {
        if (this.props.ws !== "" && this.props.ws !== undefined) {
            return (<div className="container-fluid"><br/><hr/><br/>
            <h5>Use following webservice to for integration:</h5>
            <div className="md-form active-cyan-2 mb-3">
                <input
                    value={this.props.ws}
                    name="intent" className="form-control" type="text" readonly />
            </div></div>);
        }
    }

    renderIntents() {
        if (this.props.isIntentViewActive && this.props.currentIntentSelected != undefined) {
            return <Intent />
        } else if (this.props.isIntentViewActive) {
            return <IntentList />
        } else {
            return <div className="d-flex flex-column justify-content-center align-items-center h-100">
                <h1>This is Numenedict</h1>
                <hr />
                <p>Here you can create your own model to teach your bot</p>
                {this.createWebserviceUserGuide()}
            </div>;
        }
    }
    render() {
        return (
            <div className="col-6 col-lg-6 col-sm-6 col-xs-6">
                {this.renderIntents()}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CenterComp);
