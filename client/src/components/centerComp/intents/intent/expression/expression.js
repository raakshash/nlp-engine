import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../../container/centerComp/intents/intent/expression/expression';

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
        this.props.onComponentInit(this.props.currentIntentSelected._id);
        this.setState({ intent: this.props.currentIntentSelected, expression: "" })
    }
    submitExpressionHandler(event) {
        event.preventDefault();
        this.props.onExpressionAdded(this.state);
        this.setState({ expression: '' });
    }
    setExpressionValue(event) {
        event.preventDefault();
        this.setState({ expression: event.target.value })
    }

    onExpressionDelete = (iExpression, iEvent) => {
        iEvent.preventDefault();
        this.props.onExpressionDeleted(iExpression);
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
                    {this.props.currentIntentExpressions.map((iExpression, index) =>
                        <li key={index} className="list-group-item">
                            {iExpression.value}
                            <a className="delete-button" onClick={this.onExpressionDelete.bind(this, iExpression)}>
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </a>
                        </li>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Expressions);
