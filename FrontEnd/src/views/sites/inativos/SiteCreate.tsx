//@ts-nocheck
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';

const InativoCreate = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const [statusList, setStatusList] = useState<[]>([]);
  const [site, setSite] = useState({
    id: null,
    name: '',
    url: '',
    status: '',
    final_date: '',
  });

  useEffect(() => {
    getStatus();
  }, []);
  const getStatus = () => {
    setLoading(true);
    axiosClient.get('/inativos-status')

      .then(({ data }) => {

        setStatusList(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const onSubmit = () => {
    return 1;
  };
  return (
    <>
      {loading ?
        <h1>&nbsp;</h1>
        :
        site.id ?
          <h1>Atualizar Site #{site.id} - {site.name}</h1> :
          <h1>Solicitar Pausa</h1>
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
            <form onSubmit={onSubmit} className='row'>

              <label>Nome do site</label>
              <input value={site.name} onChange={ev => setSite({ ...site, name: ev.target.value })} placeholder='Nome' type="text" />
              <label>URL</label>
              <input value={site.url} onChange={ev => setSite({ ...site, url: ev.target.value })} placeholder='https://site.com.br' type="url" />
              <label>Status</label>
              {
                site.id ?
                // TODO input readonly or do not show when CREATE 
                  <input value={statusList.find(stat => stat.id === site.status)} onChange={ev => setSite({ ...site, status: ev.target.value })} placeholder='https://site.com.br' type="text" readOnly={true} />
                  :
                  <div className='col-6'>
                    <select className="form-select">
                      {statusList.map(status => (
                        //@ts-ignore
                        <option key={status.id} value={status.id}>{status.description}</option>
                      )
                      )}
                    </select>
                  </div>

              }
              <button className='btn-edit'>Salvar</button>
            </form>
        }

      </div>
    </>
  )
}

export default InativoCreate
