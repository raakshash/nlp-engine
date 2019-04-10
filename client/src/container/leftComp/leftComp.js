

import { getIntents } from '../../store/actions/controller';

export const mapStateToProps = state => ({
    
});

export const mapDispatchToProps = dispatch => ({
    onGetIntents: function () {
        getIntents(dispatch);
    }
});