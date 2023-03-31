//@ts-nocheck
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosClient from '../axios-client';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setLoading(true);
    axiosClient.get('/users')
      .then(({ data }) => {
        console.log(data.data);
        setUsers(data.data);
        
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }
  return (
    <div>
    
      <div style={{display: 'flex', alignItems:'center', justifyContent:'space-between' }}>
        <h1>Usuários</h1>
        <Link to={"/users/create"} className='btn btn-add fadeInDown animated'>Criar usuário</Link>
      </div>
      <table>

        <theader>
          <th>ID</th>
          <th>Nome</th>
          <th>Email</th>
          <th>Criado em</th>
          <th>Editar</th>
          <th>Excluir</th>
        </theader>
        {
          loading ? 
          <tr>
            <td>
          Carregando... ⌛
          </td>
          </tr>
          : 
          users.map(user => (
            <tr>
              <td>
                {user.id}
              </td>
              <td>
                {user.name}
              </td>
              <td>
                {user.email}
              </td>
              <td>
                {user.created_at}
              </td>
              <td>
                <Link to={'users/' + user.id}>asdasd</Link>
              </td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}
