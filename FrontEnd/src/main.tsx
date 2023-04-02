import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import App from './App'
import { ContextProvider } from './contexts/ContextProvider'
import './index.css'

import router from './routes'

import { toast, ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <div>
    <React.StrictMode>
      <ContextProvider>
        <RouterProvider router={router} />

      </ContextProvider>
    </React.StrictMode>
    <ToastContainer />
  </div>
)
