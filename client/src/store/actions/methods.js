import CONSTANTS from './constant';
import { getAction } from './action';
import { getExpressions, getResponses } from './controller';

export const switchIntentSelectionState = function (iDispatch, iIntent) {
    let action = {
        type: CONSTANTS.SWITCH_INTENT_SELECTION,
        payload: {
            currentSelectedIntent: iIntent
        }
    }
    iDispatch(action);
    if (iIntent != undefined) {
        getExpressions(iDispatch, iIntent._id);
        getResponses(iDispatch, iIntent._id);
    } else {
        iDispatch(getAction(CONSTANTS.GET_EXPRESSIONS, []));
        iDispatch(getAction(CONSTANTS.GET_RESPONSES, []));
    }
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