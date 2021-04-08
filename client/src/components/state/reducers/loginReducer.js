
const loginReducer = (state = false, action) => {
    switch(action.type) {
        case 'LOGGED':
            return !state;
        default:
            return state;
    }
}

export default loginReducer;