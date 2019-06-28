import CONSTANT from '../actions/constant';

export const ResponsesReducer = (state = [], iAction) => {
    switch (iAction.type) {
        case CONSTANT.GET_RESPONSES:
            return iAction.payload.responses;
        default:
            return state
    }
}