import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider';
import DefaultLayout from './DefaultLayout';

export default function GuestLayout() {
  const {token} = useStateContext();
  
  if (token) {
    return <Navigate to='/' />
  }
  return (
    <div>
      Guest
      <Outlet/>
    </div>
  )
}
