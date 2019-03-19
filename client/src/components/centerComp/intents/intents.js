import React, { Component } from 'react';

class IntentList extends Component {
    constructor() {
        super();
        this.state = {
            intent: "",
            isIntentActive: false,
        }
        this.submitHandler = this.submitHandler.bind(this);
        this.setValue = this.setValue.bind(this);
    }
    submitHandler(event) {
        event.preventDefault();
        let self = this;
        fetch('/api/addintent', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(self.state)
        }).then(function () {
            self.props.intentListData.update();
        }).then(function () {
            self.setState({ intent: '' });
        });
    }
    setValue(event) {
        event.preventDefault();
        this.setState({ intent: event.target.value })
    }
    render() {

        return (
            <div className="container">
                <div className="container">
                    <form onSubmit={this.submitHandler}>
                        <div className="md-form active-cyan-2 mb-3">
                            <input
                                value={this.state.intent}
                                onChange={this.setValue}
                                name="intent" className="form-control" type="text" placeholder="Type your intent" required />
                        </div>
                    </form>
                    <br />
                </div>
                <div className="container-fluid wrapper">
                    <div className="list-group">
                        {this.props.intentListData.intents.map(iIntent =>
                            <button key={iIntent.key} onClick={this.props.intentListData.switchIntentData.bind(this, iIntent)} className="list-group-item list-group-item-action list-group-item-secondary">{iIntent.value}</button>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default IntentList;
