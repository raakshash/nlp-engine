import CONSTANT from '../actions/constant';


export const SwitchIntentViewReducer = function (state=false, iAction) {
    switch (iAction.type) {
        case CONSTANT.SWITCH_INTENT_VIEW:
            return iAction.payload.isIntentViewActive;
        default: return state;
    }
}