

import { getResponse } from '../../store/actions/controller';

export const mapStateToProps = state => ({
    responseData: state.responseData,
    accessID: state.userLoginData.webservice.split('/').pop()
});

export const mapDispatchToProps = dispatch => ({
    onTestExpression: function (iAccessID, iState) {
        getResponse(dispatch, iAccessID,  iState);
    },
});