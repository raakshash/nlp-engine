import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../../../container/centerComp/intents/intent/intentAction/intentAction';

class IntentAction extends Component {
    constructor() {
        super();
        this.state = {
            intent: {},
            intentAction: ""
        }
        this.submitIntentActionHandler = this.submitIntentActionHandler.bind(this);
        this.setIntentActionValue = this.setIntentActionValue.bind(this);
    }

    componentWillMount() {
        this.setState({ intent: this.props.currentIntentSelected, intentAction: this.props.currentIntentSelected.intentAction })
    }
    submitIntentActionHandler(event) {
        event.preventDefault();
        this.props.onIntentActionUpdated(this.state);
    }
    setIntentActionValue(event) {
        event.preventDefault();
        this.setState({ intentAction: event.target.value })
    }
    render() {
        return (
            <div className="container">
                <form onSubmit={this.submitIntentActionHandler}>
                    <div className="md-form active-cyan-2 mb-3">
                        <input
                            value={this.state.intentAction}
                            onChange={this.setIntentActionValue}
                            name="intent" className="form-control" type="text" placeholder="Add your Action" required />
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentAction);
