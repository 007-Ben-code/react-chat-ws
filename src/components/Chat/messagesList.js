import React from 'react'
import propTypes from 'prop-types'
import Message from './message'
import './chatStyle.css';

const MessagesList = ({ messages }) => (
	<section id="messages-list">
		<ul>
			{messages.map(message => (
				<Message
					key={message.id}
					{...message}
				/>
			))}
		</ul>
	</section>
)

// indica como debe recibir los mensajes
MessagesList.propTypes = {
	messages: propTypes.arrayOf(
		propTypes.shape({
			id: propTypes.number.isRequired,
			message: propTypes.string.isRequired,
			author: propTypes.string.isRequired,
		}).isRequired
	).isRequired
}

export default MessagesList