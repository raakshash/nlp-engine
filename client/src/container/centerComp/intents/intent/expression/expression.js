

import { addExpression, getExpressions, deleteExpression } from '../../../../../store/actions/controller';

export const mapStateToProps = state => ({
    currentIntentSelected: state.currentIntentSelected,
    currentIntentExpressions: state.currentIntentExpressions
});

export const mapDispatchToProps = dispatch => ({
    onExpressionAdded: function (iState, iCallback) {
        addExpression(dispatch, iState);
    },
    onExpressionDeleted: function(iState, iCallback){
        deleteExpression(dispatch, iState);
    },
    onComponentInit: function(iState, iCallback){
        getExpressions(dispatch, iState);
    }
});