

import { addResponse, getResponses, deleteResponse } from '../../../../../store/actions/controller';

export const mapStateToProps = state => ({
    currentIntentSelected: state.currentIntentSelected,
    currentIntentResponses: state.currentIntentResponses
});

export const mapDispatchToProps = dispatch => ({
    onResponseAdded: function (iState, iCallback) {
        addResponse(dispatch, iState);
    },
    onResponseDeleted: function(iState, iCallback){
        deleteResponse(dispatch, iState);
    },
    onComponentInit: function(iState, iCallback){
        getResponses(dispatch, iState);
    }
});