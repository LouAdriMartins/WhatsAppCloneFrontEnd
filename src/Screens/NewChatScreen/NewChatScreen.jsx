import React, { useContext, useState } from "react"
import { HomeContactContext } from "../../Context/HomeContactContext"
import NewChatHeader from "../../Components/NewChat/NewChatHeader"
import NewChatOptions from "../../Components/NewChat/NewChatOptions"
import NewChatContacts from "../../Components/NewChat/NewChatContacts"
import AddContactModal from "../../Components/AddContactModal/AddContactModal"
import LoaderSpinner from "../../Components/LoaderSppiner/LoaderSpinner"

export default function NewChatScreen() {
    const { contacts, isLoadingContacts } = useContext(HomeContactContext)
    // Control del modal
    const [showModal, setShowModal] = useState(false)
    if (isLoadingContacts) {
        return <LoaderSpinner />
    }

    return (
        <div className="newchat-container">
            <NewChatHeader />
            <NewChatOptions onAddContact={() => setShowModal(true)} />
            <NewChatContacts contacts={contacts} />
        </div>
    )
}