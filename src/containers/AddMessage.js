import { connect } from 'react-redux';

// component
import AddMessageComponent from '../components/Chat/addMessage';

// actions
import { addMessage } from '../redux/actions/chatActions';

import moment from 'moment';

let time = moment().format("h:mm:ss a")

const mapDispatchToProps = (dispatch) => ({
  dispatch: (message, author, msgtime = time) => {
    // viene de redux
    // envia los params al action
    dispatch(addMessage(message, author, msgtime))
  }
})

// hace la conexion al componete
export const AddMessage = connect(() => ({}), mapDispatchToProps)(AddMessageComponent)