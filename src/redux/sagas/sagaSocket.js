//import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga/effects';
import * as types from '../../consts/actionsTypes';
// socket cliente
import socketSetup from '../sockets/socket' 

/**
 * para manejar la creacion de web sockets
 * cuando el usuario escriba un mensaje
 * para ser trasmitido a todos los clientes conectados
 * funcion generadora para un nuevo state
 * recibe el dispatch del store y los parametyros iniciales
 */
const handleNewSocket = function* handleNewSocket(params) {
	console.log( ' <---------  Saga Socket Chat --------->');
	/**
	 * se prepara el socket cliente para que reciba las acciones del chat
	 * agregar usuarios y listarlos
	 * agregar mensajes y listarlos
	 * se crea el socket del cliente y recibe el dispatch del store como parametro
	 */
	const socket = socketSetup(params.dispatch,{name:params.username, room:params.room})
	try {
		/**
		 * tomara en cuenta todas las peticiones
		 * recibe un nuevo mensaje del servidor
		 * agrega el mensaje con los parametros recibidos
		 * cuando la accion add message ocurra se enviara un mensaje al web socket
		 * pasando la action y algunos parametros
		 */
		yield takeEvery(types.ADD_MESSAGE, (action) => {
			console.log('add new message is listening ', action)
			action.author = params.username
			action.room = params.room
			// el mensjae enviado por el usuario puede ser enviado a todos los usuarios conectados por el servidor
			socket.send(JSON.stringify(action))
		})
		
	} catch (error) {
		console.log( error )
	}
}

export default handleNewSocket