import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'

export default function OnlyIntryMangerPrivateRoute() {

    const { currentUser } = useSelector((state) => state.user);
    return currentUser &&  currentUser.isinvntryManager ? <Outlet/> : <Navigate to='/sign-in'/>
  
}