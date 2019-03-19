import React, { Component } from 'react';

class Intent extends Component {
    constructor() {
        super();
        this.state = {
            intent: {},
            expression: "",
            response:""
        }
        this.submitExpressionHandler = this.submitExpressionHandler.bind(this);
        this.submitResponseHandler = this.submitResponseHandler.bind(this);
        this.setValue = this.setValue.bind(this);
        this.setResponseValue = this.setResponseValue.bind(this);
    }

    componentWillMount() {
        this.setState({ intent: this.props.intent, expression: "" })
    }
    submitExpressionHandler(event) {
        event.preventDefault();
        let self = this;
        fetch('/api/addintent/' + this.props.intent.key, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(self.state)
        }).then(res => res.json()).then(function (iIntent) {
            self.setState({ expression: '', intent: iIntent });
        });
    }
    submitResponseHandler(event) {
        event.preventDefault();
        let self = this;
        fetch('/api/addresponse/' + this.props.intent.key, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(self.state)
        }).then(res => res.json()).then(function (iIntent) {
            self.setState({ response: '', intent: iIntent });
        });
    }
    setValue(event) {
        event.preventDefault();
        this.setState({ expression: event.target.value })
    }
    setResponseValue(event) {
        event.preventDefault();
        this.setState({ response: event.target.value })
    }
    render() {
        return (
            <div className="container">
                <div className="container">
                    <br />
                    <h2>{this.props.intent.value}</h2>
                </div>
                <hr />
                <div className="container-fluid wrapper">
                    <div className="container">
                        <form onSubmit={this.submitExpressionHandler}>
                            <div className="md-form active-cyan-2 mb-3">
                                <input
                                    value={this.state.expression}
                                    onChange={this.setValue}
                                    name="intent" className="form-control" type="text" placeholder="Type your expression" required />
                            </div>
                        </form>
                        <br />
                    </div>
                    <div className="container">
                        <div className="list-group">
                            {this.state.intent.expressions.map((iExpression, index) =>
                                <li key={index} className="list-group-item">{iExpression}</li>
                            )}
                        </div>
                    </div>
                    <div className="container">
                        <form onSubmit={this.submitResponseHandler}>
                            <div className="md-form active-cyan-2 mb-3">
                                <input
                                    value={this.state.response}
                                    onChange={this.setResponseValue}
                                    name="intent" className="form-control" type="text" placeholder="Add your response" required />
                            </div>
                        </form>
                        <br />
                    </div>
                    <div className="container">
                        <div className="list-group">
                            {this.state.intent.responses.map((iResponse, index) =>
                                <li key={index} className="list-group-item">{iResponse}</li>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Intent;
