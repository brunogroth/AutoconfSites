import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import User from '../Entities/User';



const UserForm = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState();
  const [user, setUser] = useState<User>({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  if (id) {
    useEffect(() => {
      setLoading(true)
      getUser(id);
    }, []);
  };

  const getUser = (id: string) => {
    axiosClient.get('/users/' + id)
      .then(({ data }) => {
        setUser(data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
  }

  return (
    <>
      {
        loading ?
          <h1>&nbsp;</h1>
          :
          user.id ?
            <h1>Atualizar usuário</h1> :
            <h1>Criar novo usuário</h1>
      }
      <div className='card animated fadeInDown'>
        {
          errors &&
          <div className='alert'>
            {
              Object.keys(errors).map(key => (
                <p key={key}></p>
              ))
            }
          </div>
        }
        {
          loading ?
            <p>Carregando... ⌛</p>
            :


            <form>
              <label>Teste</label>
              <input></input>
            </form>
        }
      </div>
    </>
  )
}

export default UserForm;
