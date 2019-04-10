

import { addResponse } from '../../../../../store/actions/controller';

export const mapStateToProps = state => ({
    currentIntentSelected: state.currentIntentSelected
});

export const mapDispatchToProps = dispatch => ({
    onResponseAdded: function (iState, iCallback) {
        addResponse(dispatch, iState);
    }
});