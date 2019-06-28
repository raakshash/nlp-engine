import CONSTANT from '../actions/constant';

export const SwitchIntentActiveReducer = function (state = null, iAction) {
    switch (iAction.type) {
        case CONSTANT.SWITCH_INTENT_SELECTION:
            return iAction.payload.currentSelectedIntent;
        default: return state;
    }
}
