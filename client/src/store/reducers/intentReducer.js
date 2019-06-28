import CONSTANT from '../actions/constant';

export const IntentReducer = (state = [], iAction) => {
    switch (iAction.type) {
        case CONSTANT.GET_INTENTS:
            return iAction.payload.intents;
        default:
            return state
    }
}