import React, { Component } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps, mapDispatchToProps } from '../../container/rightComp/rightComp';
import './rightComp.css';
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'


const propTypes = {
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    recognition: PropTypes.object
}

class RightComp extends Component {
    constructor() {
        super();
        this.state = {
            expression: "",
            listening: true
        }
        this.onTestExpressionSubmit = this.onTestExpressionSubmit.bind(this);
        this.setValue = this.setValue.bind(this);
        this.startListen = this.startListen.bind(this);
        this.toggleListening = this.toggleListening.bind(this);
    }

    componentWillMount() {
        let self = this;
        this.props.recognition.onresult = function (event) {
            let text = "";
            for (var i = event.resultIndex; i < event.results.length; ++i) {
                text += event.results[i][0].transcript;
            }
            self.setState({ expression: text });
        };
        this.props.recognition.onend = function (event) {
            self.props.onTestExpression(self.state);
            self.setState({ expression: '' });
        };
        this.props.recognition.onerror = function (event) {
            self.props.stopListening();
        }
    }
    onTestExpressionSubmit(event) {
        event.preventDefault();
        let self = this;
        this.props.onTestExpression(self.state);
        self.setState({ expression: '' });
    }
    setValue(event) {
        event.preventDefault();
        this.setState({ expression: event.target.value })
    }
    toggleListening(event) {
        event.preventDefault();
        this.setState({ listening: !this.state.listening }, this.startListen());
    }
    startListen() {
        let self = this;
        if (self.state.listening) {
            self.props.startListening();
        } else {
            self.setState({ expression: '' });
            self.props.stopListening();
        }
    }
    render() {
        return (
            <div className="col-3 col-lg-3 col-sm-3 col-xs-3">
                <div className="row">
                    <div className="col-10 col-lg-10 col-sm-10 col-xs-10">
                        <form onSubmit={this.onTestExpressionSubmit}>
                            <div className="md-form active-cyan-2 mb-3">
                                <input
                                    value={this.state.expression}
                                    onChange={this.setValue}
                                    name="expression" className="form-control" type="text" placeholder="Check your expression" aria-label="expression" />
                            </div>
                        </form>
                    </div>
                    <div className="col-2 col-lg-2 col-sm-2 col-xs-2">
                        <button className="listener" onClick={this.toggleListening} ><i className="fas fa-microphone"></i></button>
                    </div>
                </div><br />
                <div className="container">
                    <h3>{this.props.responseData.expression}</h3>
                    {this.props.responseData.response}
                </div>
            </div>

        );
    }
}

const options = {
    autoStart: false,
    continuous: false
}
RightComp.propTypes = propTypes

export default connect(mapStateToProps, mapDispatchToProps)(SpeechRecognition(options)(RightComp));
