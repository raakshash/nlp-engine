import React, { Component } from 'react';

class Expressions extends Component {
    constructor() {
        super();
        this.state = {
            intent: {},
            expression: ""
        }
        this.submitExpressionHandler = this.submitExpressionHandler.bind(this);
        this.setExpressionValue = this.setExpressionValue.bind(this);
    }

    componentWillMount() {
        this.setState({ intent: this.props.context.currentIntentSelected, expression: "" })
    }
    submitExpressionHandler(event) {
        event.preventDefault();
        this.props.context.onExpressionAdded(this.state);
        this.setState({ expression: '' });
    }
    setExpressionValue(event) {
        event.preventDefault();
        this.setState({ expression: event.target.value })
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitExpressionHandler}>
                    <div className="md-form active-cyan-2 mb-3">
                        <input
                            value={this.state.expression}
                            onChange={this.setExpressionValue}
                            name="intent" className="form-control" type="text" placeholder="Type your expression" required />
                    </div>
                </form>
                <br />
                <div className="list-group">
                    {this.props.context.currentIntentSelected.expressions.map((iExpression, index) =>
                        <li key={index} className="list-group-item">{iExpression}</li>
                    )}
                </div>
            </div>
        );
    }
}

export default Expressions;
