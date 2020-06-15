import *  as types from '../../consts/actionsTypes';
import { addUser, messageReceived, populateUsersList, removeUser } from '../actions/chatActions';
import moment from 'moment';

// configuracion del socket
const setupSocket = (dispatch, params) => {
	console.log(' socket params: ', params)
	// el cliente o web socket nuevo
	const socket = new WebSocket('ws://127.0.0.1:3001')
	const time = moment().format('h:mm a')

	// abre la conexion al WSS
	socket.onopen = () => {
		console.log('<-------------open socket -------------->')

		// envia datos del usuario y room al server
		// y trasmite a todos los conectados al server
		socket.send(JSON.stringify({
			type: types.ADD_USER,
			time,
			...params
		}))
	}
	// recibe los mensajes del servidor
	socket.onmessage = (event) => {
		console.log('<-------------message socket -------------->')
		//const time = moment().format('h:mm a')
		const data = JSON.parse(event.data)
		switch (data.type) {
			case types.ADD_MESSAGE:
				console.log('add message socket:', data)
				// se recibe un mensaje del servidor
				dispatch(messageReceived(data.message, data.author, time))
				break
			case types.ADD_USER:
				console.log('add user socket:', data)
				// agrega un nuevo usuario al listado
				dispatch(addUser(data.name, data.room))
				break
			case types.REMOVE_USER:
				console.log('remove user socket:', data)
				dispatch(removeUser(data.id))
				break
			case types.USERS_LIST:
				console.log('users list socket:', data)
				// obtiene el listado de los usuarios
				dispatch(populateUsersList(data.users))
				break
			default:
				break
		}
	}
	// cierra la conexion con el servidor
	socket.onclose = () => {
		socket.send(JSON.stringify({
			type: types.ADD_MESSAGE,
			time: moment().format('h:mm a'),
			...params
		}))
	}
	return socket
}

export default setupSocket
