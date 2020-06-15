import * as types from '../../consts/actionsTypes';
import moment from 'moment';
// importar actions
import { userJoin, getCurrentUser, getRoomUsers, userLeave, addMessage } from '../../Redux/actions/chatActions';
// inicia la conexion al web socket server

const setupWebSocket = ( dispatch, params ) => {
  console.log('<------------- setup function Socket ----------------->')  
  const wSocket = new WebSocket('ws://127.0.0.1:3007')
  
  wSocket.onopen = () => {
    console.log('<------------- on open Socket ----------------->')
    // el usuario se une al room del chat
    
    wSocket.send(JSON.stringify({
      type: types.USER_JOIN,
      date: moment().format('h:mm a'),
      ...params
		}))
  }
  // comienza a enviar al web seocket server
  wSocket.onmessage = (event) => {
    console.log('<------------- on message Socket ----------------->')
    const data = JSON.parse(event.data)
  

    switch (data.type) {
      case types.USER_JOIN:
        console.log('Ejecutar accion para JOIN_ROOM: ', data)
        dispatch(userJoin(data))
        
				break
      case types.CURRENT_USER:
          console.log('Ejecutar accion para CURRENT_USER: ', data)
          dispatch(getCurrentUser(data))
          break
      case types.ROOM_USERS:
        console.log('Ejecutar accion para ROOM_USERS: ', data)
        dispatch(getRoomUsers(data))
        break
      case types.USER_LEAVE:
        console.log('Ejecutar accion para USER_LEAVE: ', data)
        dispatch(userLeave(data))
        break
      case types.ADD_MESSAGE:
        console.log('Ejecutar accion para ADD_MESSAGE: ', data)
        dispatch(addMessage(data))
        break
			default:
				break
		}
  }
  wSocket.onclose = () => {
    console.log('<------------- onclose Socket client ----------------->')

    wSocket.send(JSON.stringify({
      type: types.USER_LEAVE,
      username: params.username
    }))
  }


  return wSocket;

}

export default setupWebSocket