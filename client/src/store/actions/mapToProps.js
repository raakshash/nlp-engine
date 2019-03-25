

import { getIntents, addIntent, addExpression, addResponse, getResponse, getUserLoggedIn, getUserSignuped } from './apiRequest';
import {switchIntentSelectionState} from './methods';

export const mapStateToProps = state => ({
    intents: state.intents,
    currentIntentSelected: state.currentIntentSelected,
    responseData: state.responseData,
    isUserLoggedIn: state.isUserLoggedIn
});

export const mapDispatchToProps = dispatch => ({
    onGetIntents: function () {
        getIntents(dispatch);
    },
    onIntentAdded: function (iState) {
        addIntent(dispatch, iState);
    },
    onResponseAdded: function (iState, iCallback) {
        addResponse(dispatch, iState);
    },
    onExpressionAdded: function (iState, iCallback) {
        addExpression(dispatch, iState);
    },
    switchIntentSelection: function (iIntent) {
        switchIntentSelectionState(dispatch, iIntent);
    },
    onTestExpression: function (iState) {
        getResponse(dispatch, iState);
    },
    onUserLogin: function(iState){
        getUserLoggedIn(dispatch, iState);
    },
    onUserSignup: function(iState){
        getUserSignuped(dispatch, iState);
    }
});