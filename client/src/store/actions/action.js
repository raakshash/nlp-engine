import CONSTANTS from './constant';

export const getAction = function (iType, iData) {
    switch (iType) {
        case CONSTANTS.GET_INTENTS:
            return {
                type: CONSTANTS.GET_INTENTS,
                payload: {
                    intents: iData
                }
            }
        case CONSTANTS.SWITCH_INTENT_SELECTION:
            return {
                type: CONSTANTS.SWITCH_INTENT_SELECTION,
                payload: {
                    currentSelectedIntent: iData
                }
            }
        case CONSTANTS.GET_RESPONSE:
            return {
                type: CONSTANTS.GET_RESPONSE,
                payload: iData
            }
        case CONSTANTS.USER_LOGGED_IN: {
            return {
                type: CONSTANTS.USER_LOGGED_IN,
                payload: {
                    userLoginData: iData
                }
            }
        }
        case CONSTANTS.GET_EXPRESSIONS: {
            return {
                type: CONSTANTS.GET_EXPRESSIONS,
                payload: {
                    expressions: iData
                }
            }
        }
        case CONSTANTS.GET_RESPONSES: {
            return {
                type: CONSTANTS.GET_RESPONSES,
                payload: {
                    responses: iData
                }
            }
        }
        default: return {}
    }
}