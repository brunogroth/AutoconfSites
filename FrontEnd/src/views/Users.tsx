import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import User from '../Entities/User';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {

        setUsers(data.data);
        console.log(data.meta.links);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const onDelete = (id: number) => {
    return () => {
      if (!window.confirm("Tem certeza que deseja excluir esse usuário?")) {
        return;
      }
      axiosClient.delete(`/users/${id}`)
        .then(() => {
          //TODO Show notification
          getUsers()
        })
    }
  }
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Usuários</h1>
        <Link to={"/users/create"} className='btn-add'>Criar usuário</Link>
      </div>
      <div className='card animated fadeInDown'>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Email</th>
              <th>Criado em</th>
              <th>Editar</th>
              <th>Ações</th>

            </tr>
          </thead>
          {
            loading ?
              <tr>
                <td colSpan={5} className='text-center'>Carregando... ⌛</td>
              </tr>
              :
              users.map(user => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.created_at}</td>
                  <td>
                    <Link style={{display:'block', alignSelf:'center', appearance:'button'}}className='btn-edit' to={'users/' + user.id}>Editar</Link> &nbsp;
                    </td><td>
                    <button className='btn-delete' onClick={onDelete(user.id)}>Excluir</button>
                  </td>
                </tr>
              ))
            }
        </table>
      </div>
    </div>
  )
}
