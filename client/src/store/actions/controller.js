import CONSTANTS from './constant';
import { switchIntentSelectionState } from './methods';
import { getAction } from './action';

export const getUserLoggedIn = function (iDispatch, iState) {
    fetch('/authenticate/login', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    })
        .then(res => res.json())
        .catch(iError => false)
        .then(iUserLoginData => {
            iDispatch(getAction(CONSTANTS.USER_LOGGED_IN, iUserLoginData));
        });
}

export const getUserSignuped = function (iDispatch, iState) {
    fetch('/authenticate/signup', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    })
        .then(res => res.json())
        .then(iUserLoginData => {
            iDispatch(getAction(CONSTANTS.USER_LOGGED_IN, iUserLoginData));
        });
}

export const getIntents = function (iDispatch) {
    switchIntentSelectionState(iDispatch, null);
    fetch('/api/getAllIntents')
        .then(res => res.json())
        .then(iIntents => {
            iDispatch(getAction(CONSTANTS.GET_INTENTS, iIntents));
        });
}

export const getExpressions = function (iDispatch, iIntentID) {
    fetch('/api/getAllExpressions/' + iIntentID)
        .then(res => res.json())
        .then(iExpressions => {
            iDispatch(getAction(CONSTANTS.GET_EXPRESSIONS, iExpressions));
        });
}

export const getResponses = function (iDispatch, iIntentID) {
    fetch('/api/getAllResponses/' + iIntentID)
        .then(res => res.json())
        .then(iResponses => {
            iDispatch(getAction(CONSTANTS.GET_RESPONSES, iResponses));
        });
}

export const addIntent = function (iDispatch, iState) {
    fetch('/api/addIntent', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    })
        .then(res => res.json()).then(function (iStatus) {
            if (iStatus) {
                getIntents(iDispatch);
            }
        });
}

export const addExpression = function (iDispatch, iState) {
    fetch('/api/addExpression/' + iState.intent._id, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    })
        .then(res => res.json()).then(function (iStatus) {
            if (iStatus) {
                getExpressions(iDispatch, iState.intent._id);
            }
        });
}

export const addResponse = function (iDispatch, iState) {
    fetch('/api/addResponse/' + iState.intent._id, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    })
        .then(res => res.json()).then(function (iStatus) {
            if (iStatus) {
                getResponses(iDispatch, iState.intent._id)
            }
        });
}

export const getResponse = function (iDispatch, iAccessID, iState) {
    fetch('/webservice/getResponse/'+iAccessID, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    })
        .then(res => res.json()).then(function (iResponse) {
            iDispatch(getAction(CONSTANTS.GET_RESPONSE, {
                expression: iState.expression,
                response: iResponse
            }));
        });
}

export const updateIntentAction = function (iDispatch, iState) {
    fetch('/api/updateAction/' + iState.intent._id, {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(iState)
    })
        .then(res => res.json()).then(function (iIntent) {
            iDispatch(getAction(CONSTANTS.SWITCH_INTENT_SELECTION, iIntent));
        });
}

export const deleteIntent = function(iDispatch, iState){
    fetch('/api/deleteIntent/' + iState._id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json()).then(function (iStatus) {
            if (iStatus) {
                getIntents(iDispatch);
            }
        });
}

export const deleteExpression = function (iDispatch, iState) {
    fetch('/api/deleteExpression/' + iState._id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json()).then(function (iStatus) {
            if (iStatus) {
                getExpressions(iDispatch, iState.intentID)
            }
        });
}

export const deleteResponse = function (iDispatch, iState) {
    fetch('/api/deleteResponse/' + iState._id, {
        method: "DELETE",
        headers: {
            'Content-type': 'application/json'
        }
    })
        .then(res => res.json()).then(function (iStatus) {
            if (iStatus) {
                getResponses(iDispatch, iState.intentID)
            }
        });
}