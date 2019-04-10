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

export const switchIntentViewActive = function (iDispatch, iIsIntentViewActive) {
    switchIntentSelectionState(iDispatch, null);
    let action = {
        type: CONSTANTS.SWITCH_INTENT_VIEW,
        payload: {
            isIntentViewActive: iIsIntentViewActive
        }
    }
    iDispatch(action);
}