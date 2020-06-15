import * as types from '../../consts/actionsTypes'

const users = (state = [], action) => {
	switch (action.type) {
		case types.ADD_USER:
			// console.log( 'action add user reducers: ', action)
			return state.concat([
					{ name: action.name, room: action.room, id: action.id }
				])
		case types.REMOVE_USER:
			// console.log( 'action remove user reducers: ', action)
			return state
		case types.USERS_LIST:
			// console.log( 'action list users reducers: ', action)
			return action.users
		default:
			// console.log('user default')
			return state
	}
}

export default users