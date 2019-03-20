import React, { Component } from 'react';
import Expression from './expression/expression';
import Response from './response/response';

class Intent extends Component {
    render() {
        return (
            <div className="container">
                <div className="container">
                    <br />
                    <h2>{this.props.intent.value}</h2>
                </div>
                <hr />
                <div className="container-fluid wrapper">
                    <Expression intent={this.props.intent} />
                    <Response intent={this.props.intent} />
                </div>
            </div>
        );
    }
}

export default Intent;
