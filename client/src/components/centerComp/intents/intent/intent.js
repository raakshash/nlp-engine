import React, { Component } from 'react';
import Expressions from './expression/expression';
import Response from './response/response';

class Intent extends Component {
    render() {
        return (
            <div className="container">
                <div className="container">
                    <br />
                    <h2>{this.props.context.currentIntentSelected.value}</h2>
                </div>
                <hr />
                <div className="container-fluid wrapper">
                    <Expressions context={this.props.context} />
                    <Response context={this.props.context}/>
                </div>
            </div>
        );
    }
}

export default Intent;
