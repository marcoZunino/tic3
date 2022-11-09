import React, {useEffect, useState} from 'react';
import "./chatScreen.css";
import {Avatar} from "@mui/material";

export const ChatScreen = props => {

    const chat = props.chat;

    useEffect(() => {
        if (chat) {
            getAllMessages();
        }
    });



    const getAllMessages = () => {
        //GET de mensajes del chat (buscar por id de chat)
        //setMessages(res["data"])
    }



    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        {
            name: 'Marco',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2Fstock-de-ilustraci%25C3%25B3n-icono-de-la-muestra-del-usuario-s%25C3%25ADmbolo-de-la-persona-avatar-humano-image84519083&psig=AOvVaw3quPkcEwLO1PnBAB5JA4Oq&ust=1666869299059000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOiQu5Xi_foCFQAAAAAdAAAAABAE',
            message: 'kjhjhgk'
        },
        {
            name: 'Marco',
            image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2Fstock-de-ilustraci%25C3%25B3n-icono-de-la-muestra-del-usuario-s%25C3%25ADmbolo-de-la-persona-avatar-humano-image84519083&psig=AOvVaw3quPkcEwLO1PnBAB5JA4Oq&ust=1666869299059000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOiQu5Xi_foCFQAAAAAdAAAAABAE',
            message: 'Como andas?'
        },
        {
            message: 'Bien y vos?'
        },
        ]);

    const handleSend = e => {
        e.preventDefault();
        setMessages([...messages, {message: input}]);
        setInput('');
    }



    return(
        <div className= 'chatScreen'>
            {messages.map((message) =>
                chat && chat["vendedor"] && message.name ? (
                <div className= 'chatScreen_message'>
                    <Avatar
                        className = "chatScreen_image"
                        alt = {message.name}
                        src = {message.image}
                        />
                    <p className = "chatScreen_text" > {message.message} {"id de chat "} {chat["id"]} </p>
                </div>
            ): (
                <div className= "chatScreen_message">
                    <p className = "chatScreen_textUser" > {message.message} </p>
                </div>
                )
            )}


            <form className= "chatScreen_input">
                <input
                    value = {input}
                    onChange={(e) => setInput(e.target.value)}
                    className = "chatScreen_inputField"
                    placeholder= 'Escribe un mensaje...'
                    type = "text"
                />
                <button onClick={handleSend} type="submit" className = "chatScreen_inputButton">ENVIAR</button>
            </form>

        </div>
    );
}