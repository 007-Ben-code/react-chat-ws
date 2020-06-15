import * as types from '../../consts/actionsTypes';
import moment from 'moment';
/**
 * Chat Messages
 * Aqui declaramos las actions
 * estas actions no cambian el state
 * el state cabia en los reducers
 * el reducer se encarga de crear un nuevo state cuando la action es dispatch
 */

let nextMessageId = 0
let nextUserId = 0
const msgtime = moment().format('h:mm a');

// método que llama y envia payload a la accion de agregar un mensaje
// cuando el usuario actual envia mensaje
// se agrega a una lista local de mensajes
export const addMessage = (message, author) => ({
	type: types.ADD_MESSAGE,
	id: nextMessageId++,
	msgtime,
	message,
	author
})

/**
 * Useres actions
 */
const users = []

export const addUser = (name, room = 'room-0') => ({
	type: types.ADD_USER,
	id: nextUserId++,
	name,
	room
})

// cuando otro usuario en el chat envia mensaje
export const messageReceived = (message, author) => ({
	type: types.MESSAGE_RECEIVED,
	id: nextMessageId++,
	message,
	author,
	msgtime
})

// obtiene un listado de los usuarios
export const populateUsersList = users => ({
	type: types.USERS_LIST,
	users
})

export const removeUser = id => ({
	type: types.REMOVE_USER,
	id: nextUserId--
})