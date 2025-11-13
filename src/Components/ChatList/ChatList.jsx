import React, { useContext } from 'react'
import Chat from "../Chat/Chat"
import NewMessageForm from "../NewMessageForm/NewMessageForm"
import LoaderSpinner from "../LoaderSppiner/LoaderSpinner"
import { MessageContext } from "../../Context/MessageContext"
import ContactDetailHeader from '../ContactDetailHeader/ContactDetailHeader'
import './ChatList.css'

export default function ChatList({ contact_user_id }) {
    const { isLoadingMessages } = useContext(MessageContext)

    if (isLoadingMessages) {
        return <LoaderSpinner />
    }

    return (
        <div className='principal-chat-screen'>
            <ContactDetailHeader contact_user_id={contact_user_id} />
            <div className='chat-total'>
                <Chat />
            </div>
            <NewMessageForm className='principal-chat-screen--message-form'/>
        </div>
    )
}
