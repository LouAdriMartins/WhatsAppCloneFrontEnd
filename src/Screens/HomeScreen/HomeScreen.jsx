import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar'
import TopBar from "../../Components/TopBar/TopBar"
import ContactSearchInput from "../../Components/ContactSearch/ContactSearch"
import ContactsList from "../../Components/ContactList/ContactsList"

import './HomeScreen.css'

export default function HomeScreen() {
    return (
        <div className="main-layout">
            <Sidebar />
            <div className="main-layout-principal">
                <TopBar />
                <ContactSearchInput />
                <ContactsList />
            </div>
        </div>
    )
}