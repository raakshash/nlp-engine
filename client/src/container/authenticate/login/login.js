

import { getUserLoggedIn } from '../../../store/actions/controller';

export const mapStateToProps = state => ({

});

export const mapDispatchToProps = dispatch => ({
    onUserLogin: function(iState){
        getUserLoggedIn(dispatch, iState);
    }
});