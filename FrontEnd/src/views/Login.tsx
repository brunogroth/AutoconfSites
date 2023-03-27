import React, { InputHTMLAttributes, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosClient from '../axios-client';
import { useStateContext } from '../contexts/ContextProvider';

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState(null);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const payload = {
      'email': emailRef.current?.value,
      'password': passwordRef.current?.value
    }
    
    setErrors(null); //limpar os erros anteriores

    axiosClient.post('/login', payload)
      .then(({ data }: any) => {
        setUser(data.user)
        setToken(data.token)
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          if(response.data.errors){
            setErrors(response.data.errors)
          } else {
          setErrors({
            //@ts-ignore
            email: [response.data.message]
          });
        }}
      })
  }
  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className='title'>Login em Autoconf Sites</h1>
          {
            errors && <div className='alert'>
              <ul>
                {Object.keys(errors).map(key => (
                  <li key={key}>{errors[key][0]}</li>
                ))}
              </ul>
            </div>
          }
          <input ref={emailRef} placeholder='Email' type={'email'} />
          <input ref={passwordRef} placeholder='Password' type={'password'} />
          <button className='btn btn-block'>Login</button>
          <p className='message'>
            Não registrado? <Link to="/signup">Criar uma conta</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
