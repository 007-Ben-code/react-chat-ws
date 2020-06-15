import React from 'react'
import propTypes from 'prop-types';
import './chatStyle.css';

// recibe un arreglo del listado de los usuarios
const Sidebar = ({ users }) => (
    <aside id="sidebar" className="sidebar">
        <ul className="contacts">
            {users.map(user => (
                <li className="active" key={user.id}>
                    <div className="d-flex bd-highlight">
                        <div className="img_cont">
                            <img src="https://picsum.photos/200/300" alt="user_img"className="rounded-circle user_img" />
                            <span className="online_icon"></span>
                        </div>
                        <div className="user_info">
                            <span> {user.name === ''? 'username' : user.name} </span>
                            <p>{user.name === ''? 'username' : user.name} is online</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </aside>
)

// como debe recibir el arreglo de users
Sidebar.propTypes = {
    users: propTypes.arrayOf(
        propTypes.shape({
            id: propTypes.number.isRequired,
            name: propTypes.string.isRequired,
        }).isRequired
    ).isRequired
}

export default Sidebar
