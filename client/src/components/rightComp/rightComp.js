import React, { Component } from 'react';
import './rightComp.css';

class RightComp extends Component {
    constructor() {
        super();
        this.state = {
            expression: "",
            userText: "",
            response: ""
        }
        this.onTestExpressionSubmit = this.onTestExpressionSubmit.bind(this);
        this.setValue = this.setValue.bind(this);
    }

    onTestExpressionSubmit(event) {
        event.preventDefault();
        let self = this;
        this.state.userText = this.state.expression;
        fetch('/api/getresponse', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json()).then(function (iResponse) {
            self.setState({ response: iResponse, expression: ''});
        });
    }
    setValue(event) {
        event.preventDefault();
        this.setState({ expression: event.target.value })
    }
    render() {
        return (
            <div className="col-3 col-lg-3 col-sm-3 col-xs-3">
                <div className="container">
                    <div className="container">
                        <form onSubmit={this.onTestExpressionSubmit}>
                            <div className="md-form active-cyan-2 mb-3">
                                <input
                                    value={this.state.expression}
                                    onChange={this.setValue}
                                    name="expression" className="form-control" type="text" placeholder="Check your expression" aria-label="expression" />
                            </div>
                        </form>
                    </div><br />
                    <div className="container">
                        <h3>{this.state.userText}</h3>
                        {this.state.response}
                    </div>
                </div>
            </div>
        );
    }
}

export default RightComp;
