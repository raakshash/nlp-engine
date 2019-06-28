import CONSTANT from '../actions/constant';

export const GetMachineResponseReducer = function (state = {}, iAction) {
    switch (iAction.type) {
        case CONSTANT.GET_RESPONSE:
            return {
                expression: iAction.payload.expression,
                response: iAction.payload.response
            }
        default: return {
            expression: "",
            response: ""
        }
    }
}