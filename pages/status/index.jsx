import React, { useEffect, useState } from 'react';
import Axios from '../../utils/axios';
import { STATUS_END_POINT } from '../../constants/index';
import { get } from '../../helpers/api_helper';

const Status = () => {

    const { token } = Axios();
    const[dashboard,setDashboard] = useState([])
    console.log(dashboard)
    const getAllData = async () =>{

        let isSubscribed = true;
        
        await get(STATUS_END_POINT.get())
          .then((res) => {
            console.log(res)
            if (isSubscribed) {
              setDashboard(res?.data);
              //setDashboard((prev)=>[...prev,...res?.data]);
              setLoading(false)
            }
          })
          .catch((err) => {
            console.log("Server Error ~!")
          });
    
        return () => isSubscribed = false;
      }
    
    
    
      useEffect(() => {
        getAllData()
        console.log("----")
      }, [token]);
  return (
    <div>Status</div>
  )
}

export default Status