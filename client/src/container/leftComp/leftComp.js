
import { switchIntentViewActive} from '../../store/actions/methods';

export const mapStateToProps = state => ({
    isIntentViewActive: state.isIntentViewActive
});

export const mapDispatchToProps = dispatch => ({
    onIntentViewSwitch: function(iIsIntentViewActive){
        switchIntentViewActive(dispatch, !iIsIntentViewActive);
    }
});