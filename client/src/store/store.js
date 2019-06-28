import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Reducer} from './reducers/reducer';

const allReducers = combineReducers({
    intents: Reducer.IntentReducer,
    currentIntentSelected: Reducer.SwitchIntentActiveReducer,
    currentIntentExpressions: Reducer.ExpressionsReducer,
    currentIntentResponses: Reducer.ResponsesReducer,
    responseData: Reducer.GetMachineResponseReducer,
    userLoginData: Reducer.UserLoginReducer,
    isIntentViewActive: Reducer.SwitchIntentViewReducer
});

const logger = store => next => action => {
    let result;
    console.groupCollapsed("dispatching", action.type);
    console.log('prev state', store.getState());
    console.log('action', action);
    result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
}

// const saver = store => next => action => {
//     let result = next(action);
//     localStorage['redux-store'] = JSON.stringify(store.getState());
//     return result;
// }

const storeFactory = (initialState={}) => applyMiddleware(logger)(createStore)(
    allReducers,
    // (localStorage['redux-store']) ?
    //     JSON.parse(localStorage['redux-store']) : stateData,
    window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default storeFactory;