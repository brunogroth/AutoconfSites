import React, { useEffect, useState } from 'react'
import StepIndicator from './components/StepIndicator';
import axiosClient from '../../../axios-client';
import { useNavigate, useParams } from 'react-router-dom';
import ReactLoading from 'react-loading';
import './components/StepIndicator.css';
import { toast } from 'react-toastify';

const InativoEdit = () => {

  const navigate = useNavigate();
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

  const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    // Edit
    if (site.id !== 0) {
      setLoading(true);
      axiosClient.put(`/sites/${site.id}`, site)
        .then(() => {
          navigate('/inativos');
          toast.info("Site editado com sucesso!", {theme: "colored"});
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
        { !loading && <span> {site.name}</span> 
          }</h1>
      <div className='card'>
        {
          errors &&
          <div className='alert'>
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
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
          <form className='col-8' onSubmit={onSubmit}>
            <h4 className='mb-2'>Dados do site</h4>
            <div className="form-group">
              <label htmlFor="name">Revenda</label>
              <input value={site.name} onChange={ev => setSite({ ...site, name: ev.target.value })} type="text" className="form-control" id="name" name="name" aria-describedby="Nome" placeholder="Enter email" />
            </div>
            <div className="form-group">
              <label htmlFor="url">URL do site</label>
              <input value={site.url} onChange={ev => setSite({ ...site, url: ev.target.value })} type="url" className="form-control" id="url" name="url" placeholder="https://sitedaloja.com.br" />
            </div>
            <div className="form-group">
              <label htmlFor="initialDate">Data inicial</label>
              <input value={site.created_at.toString()} type="text" className="form-control" disabled />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status">Status</label>
              <select id="status" name="status" onChange={ev => setSite({ ...site, status: parseInt(ev.target.value) })} className="form-select">
                {
                  statusList.map(stat => (
                    <option key={stat.id} value={stat.id} selected={stat.id === site.status}>{stat.description}</option>
                  ))
                }
              </select>
            </div>
            <div className="form-group ">
              <label htmlFor="finalDate">Data final</label>
              <input type="date" id="finalDate" name="final_date" className="form-control" readOnly />
            </div>
            <div className=" my-2 my-lg-0 d-flex flex-row-reverse mr-5">
              <button type="submit" className="btn btn-success px-4">Salvar</button> &nbsp;
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
