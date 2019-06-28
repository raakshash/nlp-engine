

import { addIntent, deleteIntent, getIntents } from '../../../store/actions/controller';
import {switchIntentSelectionState} from '../../../store/actions/methods';

export const mapStateToProps = state => ({
    intents: state.intents
});

export const mapDispatchToProps = dispatch => ({
    onIntentAdded: function (iState) {
        addIntent(dispatch, iState);
    },
    switchIntentSelection: function (iIntent) {
        switchIntentSelectionState(dispatch, iIntent);
    },
    onIntentDeleted: function(iState){
        deleteIntent(dispatch, iState);
    },
    onComponentInit: function(){
        getIntents(dispatch);
    }
});