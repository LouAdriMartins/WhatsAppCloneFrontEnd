import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router'
import Chat from "../Chat/Chat"
import NewMessageForm from "../NewMessageForm/NewMessageForm"
import LoaderSpinner from "../LoaderSppiner/LoaderSpinner"
import { MessageContext } from "../../Context/MessageContext"
import ContactDetailHeader from '../ContactDetailHeader/ContactDetailHeader'
import './ChatList.css'

export default function ChatList() {
    const { contact_id } = useParams()
    const { loadMessages, isLoadingMessages } = useContext(MessageContext)

    useEffect(() => {
        loadMessages(contact_id)
    }, [contact_id])

    if (isLoadingMessages) {
        return <LoaderSpinner />
    }

    return (
        <div className='principal-chat-screen'>
            <ContactDetailHeader />
            <Chat className='chat-total' />
            <NewMessageForm className='principal-chat-screen--message-form'/>
        </div>
    )
}