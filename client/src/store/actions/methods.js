import CONSTANTS from './constant';

export const switchIntentSelectionState = function (iDispatch, iIntent) {
    let action = {
        type: CONSTANTS.SWITCH_INTENT_SELECTION,
        payload: {
            currentSelectedIntent: iIntent
        }
    }
    iDispatch(action);
}