

import { getResponse } from '../../store/actions/controller';

export const mapStateToProps = state => ({
    responseData: state.responseData,
});

export const mapDispatchToProps = dispatch => ({
    onTestExpression: function (iState) {
        getResponse(dispatch, iState);
    },
});