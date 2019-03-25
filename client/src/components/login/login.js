import React, { Component } from 'react';
import './login.css';

class Login extends Component {
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
            return <div className="signup">
                <form>
                    <input name="username" className="form-control" type="username" placeholder="username" />
                    <br />
                    <input name="password" className="form-control" type="password" placeholder="password" />
                    <br />
                    <button className="form-control btn btn-success">Signup</button>
                </form>
                <br />
                <hr />
                <br />
                <button className="form-control btn btn-primary" onClick={this.switchState}>Login</button>
            </div>
        } else {
            return <div className="login">
                <form>
                    <input name="username" className="form-control" type="username" placeholder="username" />
                    <br />
                    <input name="password" className="form-control" type="password" placeholder="password" />
                    <br />
                    <button className="form-control btn btn-success">Login</button>
                </form>
                <br />
                <hr />
                <br />
                <button className="form-control btn btn-primary" onClick={this.switchState}>Signup</button>
            </div>
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

export default Login;
