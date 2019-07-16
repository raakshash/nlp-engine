import CONSTANT from '../actions/constant';

export const GetMachineResponseReducer = function (state = null, iAction) {
    switch (iAction.type) {
        case CONSTANT.GET_RESPONSE:
            return iAction.payload
        default: return state
    }
}