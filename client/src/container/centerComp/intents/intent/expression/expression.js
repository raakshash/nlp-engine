

import { addExpression } from '../../../../../store/actions/controller';

export const mapStateToProps = state => ({
    currentIntentSelected: state.currentIntentSelected
});

export const mapDispatchToProps = dispatch => ({
    onExpressionAdded: function (iState, iCallback) {
        addExpression(dispatch, iState);
    }
});