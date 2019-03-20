import React, { Component } from 'react';

class Response extends Component {
    constructor() {
        super();
        this.state = {
            intent: {},
            response: ""
        }
        this.submitResponseHandler = this.submitResponseHandler.bind(this);
        this.setResponseValue = this.setResponseValue.bind(this);
    }

    componentWillMount() {
        this.setState({ intent: this.props.intent })
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
    setResponseValue(event) {
        event.preventDefault();
        this.setState({ response: event.target.value })
    }
    render() {
        return (
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
                <div className="list-group">
                    {this.state.intent.responses.map((iResponse, index) =>
                        <li key={index} className="list-group-item">{iResponse}</li>
                    )}
                </div>
            </div>
        );
    }
}

export default Response;
