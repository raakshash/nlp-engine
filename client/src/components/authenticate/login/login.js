import React, { Component } from 'react';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
        this.loginSubmitHandler = this.loginSubmitHandler.bind(this);
        this.setLoginUsernameValue = this.setLoginUsernameValue.bind(this);
        this.setLoginPasswordValue = this.setLoginPasswordValue.bind(this);
    }

    loginSubmitHandler(event) {
        event.preventDefault();
        this.props.context.onUserLogin(this.state);
        this.setState({ username: "", password: "" })
    }
    setLoginUsernameValue(event) {
        event.preventDefault();
        this.setState({ username: event.target.value })
    }
    setLoginPasswordValue(event) {
        event.preventDefault();
        this.setState({ password: event.target.value })
    }
    render() {
        return (
            <div className="login">
                <form onSubmit={this.loginSubmitHandler}>
                    <input
                        value={this.state.username}
                        onChange={this.setLoginUsernameValue}
                        name="username" className="form-control" type="username" placeholder="username" required />
                    <br />
                    <input
                        value={this.state.password}
                        onChange={this.setLoginPasswordValue}
                        name="password" className="form-control" type="password" placeholder="password" required />
                    <br />
                    <button className="form-control btn btn-success">Login</button>
                </form>
                <br />
                <hr />
                <br />
                <button className="form-control btn btn-primary" onClick={this.props.switchState}>Signup</button>
            </div>
        );
    }
}

export default Login;
