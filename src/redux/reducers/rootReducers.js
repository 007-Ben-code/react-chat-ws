import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

// Reducers
import messages from './messagesReducer'
import users from './usersReducer'

// testing reducer 
function testingReducers() {
	return {
        testing: 'Mensaje de prueba'
    }
}
console.log( '<-------------- Root Reducer --------------->')
// combina todos los reducers en un solo reducer
const rootReducer = combineReducers({ 
    testingReducers,
    messages,
    users,
    form: formReducer
});

export default rootReducer;
