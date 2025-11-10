import React, { useContext, useState } from "react"
import { HomeContactContext } from "../../Context/HomeContactContext"
import NewChatHeader from "../../Components/NewChat/NewChatHeader/NewChatHeader"
import NewChatOptions from "../../Components/NewChat/NewChatOptions/NewChatOptions"
import NewChatContacts from "../../Components/NewChat/NewChatContacts/NewChatContacts"
import Sidebar from "../../Components/Sidebar/Sidebar"
import LoaderSpinner from "../../Components/LoaderSppiner/LoaderSpinner"
import "./NewChatScreen.css"

export default function NewChatScreen() {
    const { contacts, isLoadingContacts } = useContext(HomeContactContext)
    // Control del modal
    const [showModal, setShowModal] = useState(false)
    if (isLoadingContacts) {
        return <LoaderSpinner />
    }

    return (
        <div className="layout_newchat-screen">
            <Sidebar />
            <div className="layout_newchat-screen__container">
                <NewChatHeader />
                <NewChatOptions onAddContact={() => setShowModal(true)} />
                <NewChatContacts contacts={contacts} />
            </div>
        </div>
    )
}