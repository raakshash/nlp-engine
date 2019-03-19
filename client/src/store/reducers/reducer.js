import CONSTANT from '../actions/constant';

export const intentReducer = (state = [], iAction) => {
    switch (iAction.type) {
        case CONSTANT.GET_INTENTS:
            return iAction.payload.intents;
        default:
            return state
    }
}

export const switchIntentActiveReducer = function (state = null, iAction) {
    switch (iAction.type) {
        case CONSTANT.SWITCH_INTENT_SELECTION:
            return iAction.payload.currentSelectedIntent;
        default: return state;
    }
}

export const getMachineResponseReducer = function (state = {}, iAction) {
    switch (iAction.type) {
        case CONSTANT.GET_RESPONSE:
            return {
                expression: iAction.payload.expression,
                response: iAction.payload.response
            }
        default: return {
            expression: "",
            response: ""
        }
    }
}

export const userLoginReducer = function(state=true, iAction){
    switch(iAction.type){
        case CONSTANT.USER_LOGGED_IN:
            return iAction.payload.isUserLoggedIn
        default: return state;
    }
}