import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../../container/centerComp/intents/intents';

class IntentList extends Component {
    constructor() {
        super();
        this.state = {
            intentName: ""
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    submitHandler(event) {
        event.preventDefault();
        this.props.onIntentAdded(this.state);
        this.setState({ intentName: '' });
    }
    setValue(event) {
        event.preventDefault();
        this.setState({ intentName: event.target.value })
    }
    render() {

        return (
            <div className="container">
                <div className="container">
                    <form onSubmit={this.submitHandler}>
                        <div className="md-form active-cyan-2 mb-3">
                            <input
                                value={this.state.intentName}
                                onChange={this.setValue}
                                name="intent" className="form-control" type="text" placeholder="Type your intent" required />
                        </div>
                    </form>
                    <br />
                </div>
                <div className="container-fluid wrapper">
                    <div className="list-group">
                        {this.props.intents.map(iIntent =>
                            <button 
                            key={iIntent.key} 
                            onClick={this.props.switchIntentSelection.bind(this, iIntent)} 
                            className="list-group-item list-group-item-action list-group-item-secondary">
                            {iIntent.value}</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(IntentList);
