import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../container/centerComp/intents/intent/intent';
import Expressions from './expression/expression';
import Response from './response/response';
import IntentAction from './intentAction/intentAction';

class Intent extends Component {
    render() {
        return (
            <div className="container">
                <div className="container">
                    <br />
                    <h2>{this.props.currentIntentSelected.value}</h2>
                </div>
                <hr />
                <div className="container-fluid wrapper">
                    <Expressions />
                    <IntentAction />
                    <Response />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intent);
