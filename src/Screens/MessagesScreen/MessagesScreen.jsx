import React from 'react'
import { useParams } from 'react-router-dom'
import ChatList from '../../Components/ChatList/ChatList'
import './MessagesScreen.css'

export default function MessagesScreen() {
    const { contact_user_id } = useParams()

    return (
        <div className="messages-screen">
            <ChatList contact_user_id={contact_user_id} />
        </div>
    )
}
