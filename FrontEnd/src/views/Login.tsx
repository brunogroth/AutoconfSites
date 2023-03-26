import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  
  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className='title'>Login em Autoconf Sites</h1>
          <input placeholder='Email' type={'email'}/>
          <input placeholder='Password' type={'password'}/>
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Não registrado? <Link to="/signup">Criar uma conta</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
