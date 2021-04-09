
const loginPopupReducer = (state = false, action) => {
    switch(action.type) {
        case 'LOGINPOPUP':
            return true;
        case 'CLEARLOGINPOPUP':
            return false;
        default:
            return false;
    }
}

export default loginPopupReducer;