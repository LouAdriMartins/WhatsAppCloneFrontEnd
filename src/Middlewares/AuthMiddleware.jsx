import React from 'react'
import LOCALSTORAGE_KEYS from '../constants/localstorage'
import { Navigate, Outlet } from 'react-router-dom'

const AuthMiddleware = () => {
    //Obtenemos un elemento del localStorage
    const token = localStorage.getItem(LOCALSTORAGE_KEYS.AUTH_TOKEN)
    if(token){
        return <Outlet/>
    }
    else{
        return <Navigate to={'/login'}/>
    }
}

export default AuthMiddleware