import { connect } from 'react-redux'
import SidebarComponent from '../components/Chat/sidebar'

export const Sidebar = connect(state => ({
	users: state.users
}), {})(SidebarComponent)