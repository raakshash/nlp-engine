import React, { Component } from 'react';

class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }
        this.signupSubmitHandler = this.signupSubmitHandler.bind(this);
        this.setSignupUsernameValue = this.setSignupUsernameValue.bind(this);
        this.setSignupPasswordValue = this.setSignupPasswordValue.bind(this);
    }

    signupSubmitHandler(event) {
        event.preventDefault();
        this.props.context.onUserSignup(this.state);
        this.setState({ username: "", password: "" })
    }
    setSignupUsernameValue(event) {
        event.preventDefault();
        this.setState({ username: event.target.value })
    }
    setSignupPasswordValue(event) {
        event.preventDefault();
        this.setState({ password: event.target.value })
    }

    render() {
        return (
            <div className="signup">
                <form onSubmit={this.signupSubmitHandler}>
                    <input
                        value={this.state.username}
                        onChange={this.setSignupUsernameValue}
                        name="username" className="form-control" type="username" placeholder="username" required />
                    <br />
                    <input
                        value={this.state.password}
                        onChange={this.setSignupPasswordValue}
                        name="password" className="form-control" type="password" placeholder="password" required />
                    <br />
                    <button className="form-control btn btn-success">Signup</button>
                </form>
                <br />
                <hr />
                <br />
                <button className="form-control btn btn-primary" onClick={this.props.switchState}>Login</button>
            </div>
        );
    }
}

export default Signup;
