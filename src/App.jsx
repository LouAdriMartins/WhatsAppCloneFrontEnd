import React from "react"
import { Routes, Route, Outlet } from "react-router-dom"

import HomeScreen from "./Screens/HomeScreen/HomeScreen.jsx"
import MessagesScreen from "./Screens/MessagesScreen/MessagesScreen.jsx"
import ContactDetailScreen from "./Screens/ContactDetailScreen/ContactDetailScreen.jsx"
import LoginScreen from "./Screens/LoginScreen/LoginScreen.jsx"
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen.jsx"
import RecoverPasswordScreen from "./Screens/RecoverPasswordScreen/RecoverPasswordScreen.jsx"
import ResetPasswordScreen from "./Screens/ResetPasswordScreen/ResetPasswordScreen.jsx"
import NewChatScreen from "./Screens/NewChatScreen/NewChatScreen.jsx"
import NewGroupScreen from "./Screens/NewGroupScreen/NewGroupScreen.jsx"

import AuthMiddleware from "./Middlewares/AuthMiddleware.jsx"
import MessageContextProvider from "./Context/MessageContext.jsx"
import HomeContactContextProvider from "./Context/HomeContactContext.jsx"
import ContactDetailContextProvider from "./Context/ContactDetailContext.jsx"

function App() {
  return (
    <div>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LoginScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/recover-password" element={<RecoverPasswordScreen />} />
        <Route path="/reset-password/:token" element={<ResetPasswordScreen />} />

        {/* Private */}
        <Route element={<AuthMiddleware />}>
          <Route
            element={
              <HomeContactContextProvider>
                <MessageContextProvider>
                  <ContactDetailContextProvider>
                    <Outlet />
                  </ContactDetailContextProvider>
                </MessageContextProvider>
              </HomeContactContextProvider>
            }
          >
            <Route path="/home" element={<HomeScreen />} />
            <Route path="/new-chat" element={<NewChatScreen />} />
            <Route path="/new-group" element={<NewGroupScreen />} />
            <Route path="/contact/:contact_id/messages" element={<MessagesScreen />} />
            <Route path="/contact/:contact_id/detail" element={<ContactDetailScreen />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App