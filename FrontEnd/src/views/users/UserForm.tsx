import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../axios-client';
import User from '../../Entities/User';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';

const UserForm = () => {

  const navigate = useNavigate();
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
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
      })
  }

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // Edit
    if (user.id) {
      setLoading(true);
      axiosClient.patch(`/users/${user.id}`, user)
        .then(() => {
          navigate('/users');
          toast.info("Usuário editado com sucesso!", {theme: "colored"});
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
    } else { // Create
      setLoading(true);
      axiosClient.post('/users/', user)
        .then(({ data }) => {
          // TODO Notification
          navigate('/users');
          toast.success("Usuário criado com sucesso!");
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        });
    }
  }

  return (
    <>
      {loading ?
        <h1>&nbsp;</h1>
        :
        user.id ?
          <h1>Atualizar usuário #{user.id} - {user.name}</h1> :
          <h1>Criar novo usuário</h1>
      }
      <div className='card animated fadeInDown'>
        {
          errors &&
          <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {
          loading ?
          <ReactLoading className={'loading'} type={'cylon'} color={'#074ebb'} height={50} width={50} />
            :
            <form onSubmit={onSubmit}>

              <label> Nome</label>
              <input value={user.name} onChange={ev => setUser({ ...user, name: ev.target.value })} placeholder='Nome' type="text" />
              <label>Email</label>
              <input value={user.email} onChange={ev => setUser({ ...user, email: ev.target.value })} placeholder='E-mail' type="email" />
              <label>Senha</label>
              <input onChange={ev => setUser({ ...user, password: ev.target.value })} placeholder='Senha' type="password" />
              <label>Confirmação de Senha</label>
              <input onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })} placeholder='Confirme sua Senha' type="password" />
              <button className='btn-edit'>Salvar</button>
            </form>
        }
        
      </div>
    </>
  )
}

export default UserForm;
