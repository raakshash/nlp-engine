

import { getUserSignuped } from '../../../store/actions/controller';

export const mapStateToProps = state => ({

});

export const mapDispatchToProps = dispatch => ({
    onUserSignup: function(iState){
        getUserSignuped(dispatch, iState);
    }
});