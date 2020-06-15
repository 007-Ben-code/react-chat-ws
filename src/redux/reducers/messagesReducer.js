import * as types from '../../consts/actionsTypes'
/** 
 * Aqui es donde cambia el state de la aplicacion
 * aqui cambiara el state de los mensajes de la aplicacion
 * pasa el estado actual y la accion, y regresa el nuevo estado
 * viene de chatActions 
*/
const messages = (state = [], action) => {
	console.log( '<-------------- Messages Reducer --------------->')
	// para saber que tipo de accion esta sucediendo
	switch (action.type) {
		// se utiliza la misma funcionalidad para ambos casos
		case types.ADD_MESSAGE:
		case types.MESSAGE_RECEIVED:
			return state.concat([
				{
					message: action.message,
					author: action.author,
					time: action.time,
					id: action.id
				}
				])
		default:
			console.log('message default')
			return state
	}
}

export default messages