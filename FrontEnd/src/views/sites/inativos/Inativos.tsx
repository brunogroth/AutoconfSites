import React, { useEffect } from 'react'
import axiosClient from '../../../axios-client'

const Sites = () => {

useEffect(() => {
  getSites();
}, []);

const getSites = () => {
  axiosClient.get('/sites')
    .then(({ data }) => {
      console.log(data);
    })
    .catch((err) => {
      console.log('error: ' + err);
    })
  }

  return (
    <div>
      <table></table>
    </div>
  )
}
export default Sites
