import React, { useEffect, useState } from 'react'
import StepIndicator from './components/StepIndicator';
import axiosClient from '../../../axios-client';
import { useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import './components/StepIndicator.css';
import SiteCreate from './SiteCreate';

const InativoEdit = () => {

  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [statusList, setStatusList] = useState<InativosStatus[]>([]);
  const [errors, setErrors] = useState();

  const [site, setSite] = useState<Site>({
    id: 0,
    name: '',
    url: '',
    status: 0,
    //@ts-ignore
    final_date: '',
    //@ts-ignore
    created_at: '',
  }
  );

  const updateRemainTime = () => {
    // Todo 
  }
  const getSite = (id: string) => {
    axiosClient.get('/sites/' + id)
      .then(({ data }) => {
        setSite(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getStatus();
    id && getSite(id);
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

  return (
    <>
      <h1>Editar Site 
        { !loading && <span> #{site.id} - {site.name}</span> 
          }</h1>
      <div className='card'>
        <div className='d-flex justify-content-center stepWrapper'>
          {loading ?
            <ReactLoading className={'loading'} type={'cylon'} color={'#074ebb'} height={80} width={80} />
            :
            statusList.map((step) => (
              <StepIndicator status={step} active={site.status === step.id} site={site} />
            ))
          }
        </div>
        {loading ?
            <ReactLoading className={'loading'} type={'cylon'} color={'#074ebb'} height={80} width={80} />
            :
        <div className='card mt-5'>
          <form className='col-8'>
            <h4 className='mb-2'>Dados do site</h4>
            <div className="form-group">
              <label htmlFor="name">Revenda</label>
              <input value={site.name} onChange={ev => setSite({ ...site, name: ev.target.value })} type="text" className="form-control" id="name" aria-describedby="Nome" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL do site</label>
              <input value={site.url} type="url" className="form-control" id="url" name="url" placeholder="https://sitedaloja.com.br" />
            </div>
            <div className="form-group">
              <label htmlFor="initialDate">Data inicial</label>
              <input value={site.created_at && site.created_at.toString()} id="initialDate" type="text" className="form-control" name="initial_date" disabled />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="formGroupExampleInput2">Status</label>
              <select id="status" name="status" className="form-select">
                {
                  statusList.map(stat => (
                    <option key={stat.id} selected={stat.id === site.status}>{stat.description}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="amountTime">Tempo de Expiração</label>
              <select id="amountTime" name="expiration" onChange={updateRemainTime} className="form-select">
                <option selected>Selecione</option>
                <option value="15">15 dias</option>
                <option value="30">30 dias</option>
                <option value="45">45 dias</option>
                <option value="60">60 dias</option>
              </select>
            </div>
            <div className="form-group ">
              <label htmlFor="finalDate">Data final</label>
              <input type="date" id="finalDate" name="final_date" className="form-control" readOnly />
            </div>
            <div className=" my-2 my-lg-0 d-flex flex-row-reverse mr-5">
              <button type="submit" className="btn btn-success px-4">Criar</button> &nbsp;
              <a href="/" className="btn btn-primary px-4 mr-3">Voltar</a>
            </div>
          </form>
        </div >
        }
      </div>
    </>
  )
}

export default InativoEdit
