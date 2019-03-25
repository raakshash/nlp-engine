import React, { Component } from 'react';
import './centerComp.css';

import IntentList from './intents/intents';
import Intent from './intents/intent/intent';

class CenterComp extends Component {
    constructor() {
        super();
        this.renderIntents = this.renderIntents.bind(this);
    }

    renderIntents() {
        if (this.props.context.currentIntentSelected != undefined) {
            return <Intent context={this.props.context} />
        } else if (this.props.context.intents.length > 0) {
            return <IntentList context={this.props.context} />
        } else {
            return <div className="d-flex flex-column justify-content-center align-items-center h-100">
                    <h1>This is Numenedict</h1>
                    <hr/>
                    <p>Here you can create your own model to teach your bot</p>
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

export default CenterComp;
