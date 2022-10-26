import React from 'react';
import './chats.css';

export const chats = props => {
    return (
        <div className = 'chats'>
            <chat
                name = 'Marco'
                message = 'Hola Fede'
                timestamp = 'Hace 30 segundos'
                profilePic= "https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.dreamstime.com%2Fstock-de-ilustraci%25C3%25B3n-icono-de-la-muestra-del-usuario-s%25C3%25ADmbolo-de-la-persona-avatar-humano-image84519083&psig=AOvVaw3quPkcEwLO1PnBAB5JA4Oq&ust=1666869299059000&source=images&cd=vfe&ved=0CA0QjRxqFwoTCOiQu5Xi_foCFQAAAAAdAAAAABAE"
            />
        </div>)
}

export default chats;