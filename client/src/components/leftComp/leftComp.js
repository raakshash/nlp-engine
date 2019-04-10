import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../container/leftComp/leftComp';
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
                    <button
                        className="list-group-item list-group-item-action list-group-item-secondary"
                        onClick={this.props.onIntentViewSwitch.bind(this, this.props.isIntentViewActive)}><span>Intents</span></button>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftComp);
