// import React, { useState, useEffect } from 'react';
import React from 'react';
// import { useDispatch } from "react-redux";
// import ReactDom from 'react-dom'
import './chatStyle.css';

// containers
import { Sidebar } from '../../containers/Sidebar'
import { MessagesList } from '../../containers/MessagesList'
import { AddMessage } from '../../containers/AddMessage'

// import setupWebSocket from '../../redux/sockets/socket'

const Chat = (props) => {
    const username = props.match.params.username

    // cerrar la conexion con el socket server
    const handleLeaveChat = (event) => {
        alert( 'Leaving the Chat...')
        window.close()
        //props.history.push("/")
    }
    return (
        <div className="container-fluid h-100">
            <div className="chat-container row justify-content-center h-100">
                <div className="col-md-4 col-xl-3 chat">
                    <div className="card contacts_card">
                        <div className="card-header">
                            <div className="input-group">
                                <input type="text" placeholder="Search..." name="" className="form-control search" />
                                <div className="input-group-prepend">
                                    <span className="input-group-text search_btn"><i className="fas fa-search"></i></span>
                                </div>
                            </div>
                        </div>
                        <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                        <div className="card-body contacts_body">
                            <Sidebar />
                        </div>
                        <div className="card-footer"></div>
                    </div>

                </div>
                <div className="col-md-8 col-xl-6 chat">

                    <div className="card">
                        <div className="card-header msg_head">
                            <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                    <img src="https://picsum.photos/200/300" alt="user_img" className="rounded-circle user_img" />
                                    <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                    <span>Chat with {username}</span>
                                    <p>number of Messages</p>
                                </div>
                                <div className="video_cam">
                                    <span><i className="fas fa-video"></i></span>
                                    <span><i className="fas fa-phone"></i></span>
                                </div>
                            </div>
                            <span id="action_menu_btn"><i className="fas fa-ellipsis-v"></i></span>
                            <div className="action_menu">
                                <ul>
                                    <li><i className="fas fa-user-circle"></i> View profile</li>
                                    <li><i className="fas fa-users"></i> Add to close friends</li>
                                    <li><i className="fas fa-plus"></i> Add to group</li>
                                    <li><i className="fas fa-ban"></i> Block</li>
                                </ul>
                            </div>
                        </div>
                        <div className="card-body msg_card_body">
                            <div className="d-flex justify-content-start mb-4">
                                <div className="img_cont_msg">
                                    <img src="https://picsum.photos/200/300" alt="user_img_msg" className="rounded-circle user_img_msg" />
                                </div>
                                <div className="msg_cotainer">
                                    <MessagesList />
                                </div>
                            </div>
                        </div>
                        <div className="card-footer msg_foot">
                            <AddMessage />
                        </div>
                    </div>

                </div>
            </div>
            <div>
                <button className="form-control btn btn-danger" type="button" onClick={handleLeaveChat}>Leave Chat Room</button>
            </div>
        </div>
    );
}


export default Chat;