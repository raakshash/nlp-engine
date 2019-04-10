

export const mapStateToProps = state => ({
    intents: state.intents,
    currentIntentSelected: state.currentIntentSelected,
    isIntentViewActive: state.isIntentViewActive,
    ws: state.userLoginData.webservice
});

export const mapDispatchToProps = dispatch => ({

});