//@ts-nocheck
import React, { useEffect, useState } from 'react'
import ReactLoading from 'react-loading'
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axios-client';
import { toast } from 'react-toastify';

const InativoCreate = () => {
  const { id } = useParams();
  const [errors, setErrors] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const [statusList, setStatusList] = useState<[]>([]);
  const [site, setSite] = useState({
    id: null,
    name: '',
    url: '',
    status: 1,
    final_date: '',
  });
const today = new Date;

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

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    axiosClient.post('/sites/', site)
      .then(({ data }) => {
        navigate('/inativos');
        toast.success("Solicitação registrada com sucesso!");
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
  };

  const updateFinalDate = (ev) => {
    ev.preventDefault();
    const datesum = new Date();
    datesum.setDate(today.getDate() + parseInt(ev.target.value));
    const string_date = today.getMonth() + '/' + datesum.getDate()  + '/' +  today.getFullYear()
    console.log('today: ' + today + '| ' +'datesum= ' + datesum + 'string+date = ' + string_date);
    const final_date = new Date(string_date);
    
    setSite({ ...site, final_date: datesum })
    console.log( final_date, site);
  }
  return (
    <>
      {loading ?
        <h1>&nbsp;</h1>
        :
        <h1>Solicitar Pausa de Site</h1>
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
              <input onChange={ev => setSite({ ...site, name: ev.target.value })} placeholder='Nome' type="text" />
              <label>URL</label>
              <input value={site.url} onChange={ev => setSite({ ...site, url: ev.target.value })} placeholder='https://site.com.br' type="url" />
              <label>Status</label>
              <input value={'Aguardando Pausa'} type="text" disabled />
              <label>Tempo de Expiração</label>
              {/* TODO CALCULO DA FINAL_DATE (data atual + x dias) e armazenar em ...site */}
              <select className='form-select mb-3' onChange={updateFinalDate}>
                <option value={15}>15 dias</option>
                <option value={30}>30 dias</option>
                <option value={45}>45 dias</option>
              </select>
              
              <button className='btn-edit'>Solicitar</button>
            </form>
        }

      </div>
    </>
  )
}

export default InativoCreate
