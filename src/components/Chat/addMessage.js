import React from 'react'
import propTypes from 'prop-types'
import './chatStyle.css';


const AddMessage = (props) => {
    const handleAddMessage = (e) => {
        if (input.value) {
            props.dispatch(input.value, 'Me')
            input.value = ''
        }
    }
    let input
    return (
        <section id="new-message">
            <div className="input-group">
                <div className="input-group-append">
                    <span className="input-group-text attach_btn"><i className="fas fa-paperclip"></i></span>
                </div>
                <input
                    onKeyPress={(e) => {
                        if (input.value && e.key === 'Enter') {
                            // se hara dispatch de la action add mesage del usuario que envio el mensaje
                            props.dispatch(input.value, 'Me')
                            input.value = ''
                        }
                    }}
                    type="text" name="" className="form-control type_msg" placeholder="Type your message..."
                    ref={(node) => {
                        input = node
                    }}
                />
                {/* <textarea name="" className="form-control type_msg" placeholder="Type your message..."></textarea> */}
                <div className="input-group-append">
                    <button className="input-group-text send_btn" onClick={handleAddMessage}><i className="fas fa-location-arrow"></i></button>
                </div>
            </div>
        </section>
    )
}
// para hacer que el dispatch funcione
AddMessage.propTypes = {
    dispatch: propTypes.func.isRequired
}

export default AddMessage