import React, { Component } from 'react';
import Login from './login/login';
import Signup from './signup/signup';
import './authenticate.css';

class Authenticate extends Component {
    constructor() {
        super();
        this.state = {
            isSignupActive: false
        }
        this.renderSignupLoginPage = this.renderSignupLoginPage.bind(this);
        this.switchState = this.switchState.bind(this);
    }

    switchState() {
        this.setState({ isSignupActive: !this.state.isSignupActive });
    }

    renderSignupLoginPage() {
        if (this.state.isSignupActive) {
            return <Signup context={this.props.context} switchState={this.switchState} />
        } else {
            return <Login context={this.props.context} switchState={this.switchState} />
        }
    }

    render() {
        return (
            <div className="login-page">
                < div className="card">
                    < div className="card-body" >
                        <div className="wrap">
                            {this.renderSignupLoginPage()}
                        </div>
                    </div >
                </div >
            </div>
        );
    }
}

export default Authenticate;
