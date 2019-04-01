import React, { Component } from 'react';
import './rightComp.css';
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'


const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool,
    recognition: PropTypes.object,
    finalTranscript: PropTypes.string
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
            self.props.context.onTestExpression(self.state);
            self.setState({ expression: '' });
        };
        this.props.recognition.onerror = function (event) {
            self.props.stopListening();
        }
    }
    onTestExpressionSubmit(event) {
        event.preventDefault();
        let self = this;
        this.props.context.onTestExpression(self.state);
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
            // self.props.resetTranscript();
            self.props.stopListening();
        }
    }
    render() {
        // if (!this.props.browserSupportsSpeechRecognition) {
        //     return (<p>Your browser doesn't allow speech recognition</p>)
        // }
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
                    <h3>{this.props.context.responseData.expression}</h3>
                    {this.props.context.responseData.response}
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

export default SpeechRecognition(options)(RightComp);
