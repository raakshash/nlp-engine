import CONSTANT from '../actions/constant';


export const UserLoginReducer = function(state={isUserLoggedIn: false}, iAction){
    switch(iAction.type){
        case CONSTANT.USER_LOGGED_IN:
            return iAction.payload.userLoginData
        default: return state;
    }
}