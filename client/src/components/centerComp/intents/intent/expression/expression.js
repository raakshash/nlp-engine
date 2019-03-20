import React, { Component } from 'react';

class Expressions extends Component {
    constructor() {
        super();
        this.state = {
            intent: {},
            expression: ""
        }
        this.submitExpressionHandler = this.submitExpressionHandler.bind(this);
        this.setValue = this.setValue.bind(this);
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
    setValue(event) {
        event.preventDefault();
        this.setState({ expression: event.target.value })
    }
    render() {
        return (
            <div className="container">
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
                <div className="list-group">
                    {this.state.intent.expressions.map((iExpression, index) =>
                        <li key={index} className="list-group-item">{iExpression}</li>
                    )}
                </div>
            </div>
        );
    }
}

export default Expressions;
