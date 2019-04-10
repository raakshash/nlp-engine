import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../../container/centerComp/intents/intent/response/response';

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
        this.setState({ intent: this.props.currentIntentSelected, response: "" })
    }
    submitResponseHandler(event) {
        event.preventDefault();
        this.props.onResponseAdded(this.state);
        this.setState({ response: '' });
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
                    {this.props.currentIntentSelected.responses.map((iResponse, index) =>
                        <li key={index} className="list-group-item">{iResponse}</li>
                    )}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Response);
