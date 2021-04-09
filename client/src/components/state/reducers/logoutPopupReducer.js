
const logoutPopupReducer = (state = false, action) => {
    switch(action.type) {
        case 'LOGOUTPOPUP':
            return true;
        case 'CLEARLOGOUTPOPUP':
            return false;
        default:
            return false;
    }
}

export default logoutPopupReducer;