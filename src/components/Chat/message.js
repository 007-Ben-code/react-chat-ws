import React from 'react'
import propTypes from 'prop-types'
import './chatStyle.css';
/** 
 * Este componente sera renderizado el el messagelist component
 * que iterara sobre el listado de mensajes
*/
const Message = ({message, author, msgtime}) => (
	<p> 
		<i>{author}</i>: {message}
		<br />
		<span><small>{msgtime}</small></span>
	</p>
	)

Message.propTypes = {
	message: propTypes.string.isRequired,
	author: propTypes.string.isRequired
}

export default Message