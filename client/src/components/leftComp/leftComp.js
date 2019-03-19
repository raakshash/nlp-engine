import React, { Component } from 'react';
import './leftComp.css';

class LeftComp extends Component {

    render() {
        return (
            <div className="col-3 col-lg-3 col-sm-3 col-xs-3">
                <div className="row userTitle">
                    Train your bot
                </div>
                <hr />
                <div className="button-box">
                    <button className="list-group-item list-group-item-action list-group-item-secondary" onClick={this.props.updateIntents}><span>Intents</span></button>
                </div>
                {/* <div className="button-box logout-bar">
                    <hr />
                    <button className="list-group-item list-group-item-action list-group-item-secondary" id="logout"><span>Logout</span></button>
                </div> */}
            </div>
        );
    }
}

export default LeftComp;
