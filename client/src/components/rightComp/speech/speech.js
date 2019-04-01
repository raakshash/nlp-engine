import React, { Component } from 'react';
import PropTypes from 'prop-types'
import SpeechRecognition from 'react-speech-recognition'


const propTypes = {
    // Props injected by SpeechRecognition
    transcript: PropTypes.string,
    resetTranscript: PropTypes.func,
    startListening: PropTypes.func,
    stopListening: PropTypes.func,
    browserSupportsSpeechRecognition: PropTypes.bool
}


class Speech extends Component {
    constructor() {
        super();
        this.state = {
            listening: false
        }
        
    }
    render() {
        const { transcript, resetTranscript, startListening, stopListening, browserSupportsSpeechRecognition } = this.props;
        if (!browserSupportsSpeechRecognition) {
            return (<p>Your browser doesn't allow speech recognition</p>)
        }

        return (
            <button className="btnStart" onClick={this.toggleListening}>start</button>
        );
    }
}

const options = {
    autoStart: false
}
Speech.propTypes = propTypes

export default SpeechRecognition(options)(Speech);
