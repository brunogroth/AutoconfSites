
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';
import User from '../Entities/User';
import { decode } from 'html-entities';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        setUsers(data.data);
        setPagination(data.meta.links);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }

  const onDelete = (id: number | null) => {
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

  const onPaginate = (url: string) => {

    return () => {
      setLoading(true);

      axiosClient.get(url)
        .then(({ data }) => {
          setUsers(data.data);
          setLoading(false);
          setPagination(data.meta.links)
        })
        .catch(() => {
          setLoading(false);
        });
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
              <tbody>
                <tr>
                  <td colSpan={6} className='text-center'>
                    <h2>Carregando... ⌛</h2>
                  </td>
                </tr>
              </tbody>
              :
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.created_at}</td>
                    <td>
                      <Link className='btn-edit' to={'/users/' + user.id}>Editar</Link>
                    </td><td>
                      <button className='btn-delete' onClick={onDelete(user.id)}>Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
          }
        </table>
        {
          !loading &&
          pagination &&
          <div className='pagination'>
            {
              Object.keys(pagination).map(key => (
                <button className={pagination[key]['active'] && 'active'} onClick={onPaginate(pagination[key]['url'])} key={key}>
                  {decode(pagination[key]['label'])}
                </button>
              ))
            }
          </div>
        }
      </div>
    </div>
  )
}
