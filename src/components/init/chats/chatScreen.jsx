import React, {useEffect, useState} from 'react';
import "./chatScreen.css";
import {Avatar} from "@mui/material";

export const ChatScreen = props => {

    const chat = props.chat;
    const userType = props.userType;

    const getAllMessages = () => {
        //GET de mensajes del chat (buscar por id de chat)
        //setMessages(res["data"])
        const params = { chat: chat["id"]};
        const url = `http://localhost:8000/api/mensaje?${new URLSearchParams(params)}`
        fetch(url)
            .then(data => data.json())
            .then(res => {
                console.log("Messages get result is:", res);

                if (res["result"] === "ok") {
                    setMessages(res["data"]);   //array de mensajes
                } else {
                    console.log("error like");
                }
            })

    }

    const postMessage = message => {

        //POST params = message
        const options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body:JSON.stringify(message)
        };
        const url = `http://localhost:8000/api/mensaje`
        fetch(url, options)
            .then(data => data)
            .then(res => {
                try {
                    console.log("like POST res:", res);
                    if (!res.ok) {
                        //setMsg("Error en like")
                    }

                } catch (e) {
                    console.log(e.message);
                }
            })


    }


    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        // {
        //     name: 'Marco',
        //     image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2Fstock-de-ilustraci%25C3%25B3n-icono-de-la-muestra-del-usuario-s%25C3%25ADmbolo-de-la-persona-avatar-humano-image84519083&psig=AOvVaw3quPkcEwLO1PnBAB5JA4Oq&ust=1666869299059000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOiQu5Xi_foCFQAAAAAdAAAAABAE',
        //     message: 'kjhjhgk'
        // },
        // {
        //     name: 'Marco',
        //     image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2Fstock-de-ilustraci%25C3%25B3n-icono-de-la-muestra-del-usuario-s%25C3%25ADmbolo-de-la-persona-avatar-humano-image84519083&psig=AOvVaw3quPkcEwLO1PnBAB5JA4Oq&ust=1666869299059000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOiQu5Xi_foCFQAAAAAdAAAAABAE',
        //     message: 'Como andas?'
        // },
        // {
        //     message: 'Bien y vos?'
        // },
    ]);

    useEffect(() => {
        if (chat && chat["id"]) {
            getAllMessages();
        }
    },[chat]);

    const handleSend = e => {
        e.preventDefault();
        const message = { contenido: input, enviado_por: userType, chat: chat["id"] };
        postMessage(message);
        setMessages([...messages, message]);
        setInput('');
    }

    return(
        <div className= 'ChatScreen'>
            {messages.map((message) =>
                (message["enviado_por"] !==  userType) ? (      //mensajes recibidos
                    <div className= 'chatScreen_message'>
                        <Avatar
                            className = "chatScreen_image"
                            alt = "asdf"//{message.name}
                            src = ""//{message.image}
                            />
                        <p className = "chatScreen_text" > {message["contenido"]} </p>
                    </div>
                ): ( //enviado_por === <userType> //mensajes enviados
                    <div className= "chatScreen_message">
                        <p className = "chatScreen_textUser" > {message["contenido"]} </p>
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
                <button onClick={handleSend} type="submit" className="btn1">Enviar</button>
            </form>

        </div>
    );
}