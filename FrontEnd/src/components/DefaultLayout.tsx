import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'

export default function DefaultLayout() {
  const {user, token} = useStateContext();
  
  if (!token) {
    return <Navigate to='/login'/>
  }
  console.log(token);
  return (
    <div>
      Default
      
      <Outlet/>
    </div>
  )
}