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
import NewContactScreen from "./Screens/NewContactScreen/NewContactScreen.jsx"
import ProfileScreen from "./Screens/ProfileScreen/ProfileScreen.jsx"

import AuthMiddleware from "./Middlewares/AuthMiddleware.jsx"
import MessageContextProvider from "./Context/MessageContext.jsx"
import HomeContactContextProvider from "./Context/HomeContactContext.jsx"
import ContactDetailContextProvider from "./Context/ContactDetailContext.jsx"
import { AuthContextProvider } from "./Context/AuthContext.jsx"

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          {/* Publico */}
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/recover-password" element={<RecoverPasswordScreen />} />
          <Route path="/reset-password" element={<ResetPasswordScreen />} />

          {/* Privado */}
          <Route element={<AuthMiddleware />}>
            <Route
              element={
                <MessageContextProvider>
                  <HomeContactContextProvider>
                    <ContactDetailContextProvider>
                      <Outlet />
                    </ContactDetailContextProvider>
                  </HomeContactContextProvider>
                </MessageContextProvider>
              }
            >
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/new-chat" element={<NewChatScreen />} />
              <Route path="/new-contact" element={<NewContactScreen />} />
              <Route path="/contact/:contact_user_id/messages" element={<MessagesScreen />} />
              <Route path="/contact/:contact_user_id/detail" element={<ContactDetailScreen />} />
            </Route>
          </Route>
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App