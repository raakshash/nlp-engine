

import { updateIntentAction } from '../../../../../store/actions/controller';

export const mapStateToProps = state => ({
    currentIntentSelected: state.currentIntentSelected
});

export const mapDispatchToProps = dispatch => ({
    onIntentActionUpdated: function (iState, iCallback) {
        updateIntentAction(dispatch, iState);
    }
});