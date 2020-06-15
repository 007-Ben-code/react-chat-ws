const WebSocket = require('ws');
// crear el web socket server
const wss = new WebSocket.Server({ port: 3001 })
// listado de usuarios
const users = []
// nombre del bot que sera el server
const botName = 'Expandit-Chat';
// trasmitir la data & the web socket
const broadcast = (data, ws) => {
	// para cada cliente que se una al servidor
	wss.clients.forEach((client) => {
		// si el estado del cliente es igual a el web socket abierto
		// y el cliente no es igual al web socket
		if (client.readyState === WebSocket.OPEN && client !== ws ) { 
			// enviar la data al web socket
			client.send(JSON.stringify(data))
		}
	})
}

// comienza el web socket server
wss.on('connection', (ws) => {
	console.log( 'New Web Socket Conection ...')
	let index
	//envia bienvenida al usuario actual
	// el método send siempre envia un string
	ws.send(JSON.stringify({
		type: 'ADD_MESSAGE',
		message: 'Welcome to Chat!',
		author: botName
	}))
	// informa que se ha unido un nuevo usuario a los usuarios en el room
	broadcast({
		type: 'ADD_MESSAGE',
		message:  'A user has joined the chat',
		author: botName
	}, ws)
	// acciones a realizar una vez que se recibe un mensaje
	ws.on('message', (message) => {
		const data = JSON.parse(message)
		switch (data.type) {
			case 'ADD_USER': {
				console.log('WSS data recibida en ADD_USER:', data )
				index = users.length
				// lista de usuarios del lado del servidor
				users.push({ name: data.name, room: data.room, id: index + 1})
				ws.send(JSON.stringify({
					type: 'USERS_LIST',
					users
				}))
				// trasmitira el listado de usuarios a todos los clientes conectados
				broadcast({
					type: 'USERS_LIST',
					users
				}, ws)
				break
			}
			case 'ADD_MESSAGE':
				console.log('WSS data recibida en ADD_MESSAGE:', data )
				// cuando llega un mensaje se trasmite a todos los clientes conectados
				broadcast({
					type: 'ADD_MESSAGE',
					message: data.message,
					author: data.author,
					msgtime: data.msgtime
				}, ws)
				break
			default:
				break
		}
	})

	ws.on('close', () => {
		/**
		 * remover el usuario de la lista de usuarios
		 * envia a todos los usuarios el nuevo listado 
		 * para que sepan que ha salido un usario
		 */
		// broadcast({
		// 	type: 'USERS_LIST',
		// 	message: 'user has let the Chat!',
		// 	author: botName,
		// 	users
		// }, ws)
		//users.splice(index, 1)
		users.splice(index, 1)[0];
		broadcast({
			type: 'ADD_MESSAGE',
			message: 'user has let the Chat!',
			author: botName,
			users
		}, ws)
	})
})



