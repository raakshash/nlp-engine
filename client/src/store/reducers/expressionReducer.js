import CONSTANT from '../actions/constant';

export const ExpressionsReducer = (state = [], iAction) => {
    switch (iAction.type) {
        case CONSTANT.GET_EXPRESSIONS:
            return iAction.payload.expressions;
        default:
            return state
    }
}