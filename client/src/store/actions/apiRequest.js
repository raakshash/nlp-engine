import CONSTANTS from './constant';
import { switchIntentSelectionState } from './methods';
import { getAction } from './action';

export const getIntents = function (iDispatch) {
    switchIntentSelectionState(iDispatch, null);
    fetch('/api/intents')
        .then(res => res.json())
        .then(iIntents => {
            iDispatch(getAction(CONSTANTS.GET_INTENTS, iIntents));
        });
}

export const addIntent = function (iDispatch, iState) {
    fetch('/api/addintent', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    }).then(function () {
        getIntents(iDispatch);
    });
}

export const addExpression = function (iDispatch, iState) {
    fetch('/api/addintent/' + iState.intent.key, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    }).then(res => res.json()).then(function (iIntent) {
        iDispatch(getAction(CONSTANTS.SWITCH_INTENT_SELECTION, iIntent));
    });
}

export const addResponse = function (iDispatch, iState) {
    fetch('/api/addresponse/' + iState.intent.key, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    }).then(res => res.json()).then(function (iIntent) {
        iDispatch(getAction(CONSTANTS.SWITCH_INTENT_SELECTION, iIntent));
    });
}

export const getResponse = function (iDispatch, iState) {
    fetch('/api/getresponse', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    }).then(res => res.json()).then(function (iResponse) {
        iDispatch(getAction(CONSTANTS.GET_RESPONSE, {
            expression: iState.expression,
            response: iResponse
        }));
    });
}