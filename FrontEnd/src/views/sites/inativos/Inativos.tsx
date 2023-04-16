import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client'
import { Link } from 'react-router-dom';
import SiteCard from './components/SiteCard';
import ReactLoading from 'react-loading';



const Sites = () => {
  const [sites, setSites] = useState<Site[]>([])
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getSites();
  }, []);

  const getSites = () => {
    axiosClient.get('/sites')
      .then(({ data }) => {
        console.log(data);
        setSites(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log('error: ' + err);
        setLoading(false);
      })
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1>Sites Inativos</h1>
        <Link to={'create'} className='btn btn-primary'>Solicitar Pausa de Site</Link>
      </div>
      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        <p>Gerencie sites de clientes inadimplentes aqui. Veja o status de pausa ou desativação de cada site, bem como os clientes recuperados.</p>
      </div>
      <div className="container">
        <div className="row">
          {
            loading ?
              <ReactLoading className={'loading'} type={'cylon'} color={'#074ebb'} height={120} width={120} />
              :
              sites.map(site => (
                <>
                  <SiteCard key={site.id} name={site.name} id={site.id} url={site.url} createdAt={''} disableAt={''} status={site.status} timeRemaining={''} 
                    onEdit={function (): void {}} onRestore={function (): void {}} onDelete={function (): void {}} />
                  <SiteCard key={site.id} name={site.name} id={site.id} url={site.url} createdAt={''} disableAt={''} status={site.status} timeRemaining={''} 
                    onEdit={function (): void {}} onRestore={function (): void {}} onDelete={function (): void {}} />
                  <SiteCard key={site.id} name={site.name} id={site.id} url={site.url} createdAt={''} disableAt={''} status={site.status} timeRemaining={''} 
                    onEdit={function (): void {}} onRestore={function (): void {}} onDelete={function (): void {}} />
                  <SiteCard key={site.id} name={site.name} id={site.id} url={site.url} createdAt={''} disableAt={''} status={site.status} timeRemaining={''} 
                    onEdit={function (): void {}} onRestore={function (): void {}} onDelete={function (): void {}} />
                </>
              ))

          }
        </div>
      </div>
    </div>
  )
}
export default Sites
