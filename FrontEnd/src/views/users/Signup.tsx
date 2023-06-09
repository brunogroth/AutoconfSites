import React, { FormEvent, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../../axios-client';
import { useStateContext } from '../../contexts/ContextProvider';

export default function Signup() {

  // this could be useState
  //                useRef<Type>(initialValue);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmationRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser, setToken } = useStateContext();

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setLoading(true);
    // Construct payload
    const payload = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      password_confirmation: passwordConfirmationRef.current?.value,
    }

    // Submit request to server
    axiosClient.post('/signup', payload)

      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token)
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  return (
    <div className='login-signup-form animated fadeInDown'>
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className='title'>Registre-se em Autoconf Sites</h1>
          {
            errors && <div className='alert'>
              <ul>
                {Object.keys(errors).map(key => (
                  <li key={key}>{errors[key][0]}</li>
                ))}
              </ul>
            </div>
          }
          <input ref={nameRef} placeholder='Nome' type={'text'} />
          <input ref={emailRef} placeholder='Email' type={'email'} />
          <input ref={passwordRef} placeholder='Senha' type={'password'} />
          <input ref={passwordConfirmationRef} placeholder='Confirmação de Senha' type={'password'} />
          <button className='btn btn-block'>Registrar-se</button>
          <p className='message'>
            Já registrado? <Link to="/login">Fazer Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
