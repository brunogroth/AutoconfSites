//@ts-nocheck
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client.js";
import { createRef } from "react";
import { useStateContext } from "../../contexts/ContextProvider.js";
import { useState } from "react";
import ReactLoading from 'react-loading';

export default function Login() {
  const emailRef = createRef();
  const passwordRef = createRef();
  const { setUser, setToken } = useStateContext();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = ev => {
    setLoading(true);
    ev.preventDefault()

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    axiosClient.post('/login', payload)
      .then(({ data }) => {
        setUser(data.user)
        setToken(data.token);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login into your account</h1>

          {message &&
            <div className="alert">
              <p>{message}</p>
            </div>
          }
          {
            loading &&
            <ReactLoading className={'loading'} type={'cylon'} color={'#074ebb'} height={50} width={50} />
          }
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">Not registered? <Link to="/signup">Create an account</Link></p>


        </form>
      </div>
    </div>
  )
}