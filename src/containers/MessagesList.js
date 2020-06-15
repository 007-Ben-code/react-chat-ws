import { connect } from 'react-redux'
import MessagesListComponent from '../components/Chat/messagesList'

export const MessagesList = connect(state => ({
	messages: state.messages
}), {})(MessagesListComponent)