const WebSocket = require('ws');

// crear el web socket que sera server
const wss = new WebSocket.Server({ port: 3007 })

const users = []

const botName = 'Expandit-Chat';
// data y el web sockert
const broadcast = (data, ws) => {
	console.log( 'data client: ', data )
	// para cada ciente que se conecte al web socket
	// broadcasting to all connected WebSocket clients, including itself.
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN && client !== ws ) { 
			client.send(JSON.stringify(data))
		}
	})
}
// establece el canal para poer estar escuchando las peticiones del web socket cliente
// recibe un web socket
wss.on('connection', (ws) => {
	console.log( 'New Web Socket Conection ...')
	let index
	// bienvenida al usuario actual
	ws.send(JSON.stringify({
		type: 'ADD_MESSAGE',
		message: 'Welcome to Chat!',
		author: botName
	}))
	// informa que se ha unido un nuevo usuario a los usuarios en el room
	broadcast({
		type: 'USER_JOIN',
		message:  'A user has joined the chat',
		author: botName
	}, ws)

	ws.on('message', (message) => {
		// al conectarse el cliente, se recibe mensaje de bienvenida
		// recibe la data y la parsea para ontemer un objeto JSON
		const data = JSON.parse(message)
		console.log( 'server data on message: ', data)

		switch (data.type) {
			case 'USER_JOIN': {
				console.log('data join server user ')
				index = users.length
				users.push({ name: data.name, room: data.room, time: data.date, id: index + 1})
				ws.send(JSON.stringify({
					type: 'ROOM_USERS',
					users
				}))
				broadcast({
					type: 'ROOM_USERS',
					users
				}, ws)
				break
			}
			case 'CURRENT_USER':
				broadcast({
					type: 'CURRENT_USER',
					message: data.message,
					author: data.name
				}, ws)
				break
			// case 'ROOM_USERS':
			// 	broadcast({
			// 		type: 'ROOM_USERS',
			// 		message: data.message,
			// 		author: data.name
			// 	}, ws)
			// 	break
			case 'USER_LEAVE':
				broadcast({
					type: 'USER_LEAVE',
					message: data.message,
					author: data.name
				}, ws)
				break
			case 'ADD_MESSAGE':
				broadcast({
					type: 'ADD_MESSAGE',
					message: data.message,
					author: data.name
				}, ws)
				break
			default:
				break
		}

		
	})

	// configurar para cuando el usuario de desconecte
		// enviar informacion del usuario y el room
	ws.on('close', () => {
		console.log( 'close client ...')
		users.splice(index, 1)
		broadcast({
			type: 'USER_LEAVE',
			message: 'A user has left the chat',
			author: botName,
			users
		}, ws)
	})
})



