import axios from 'axios';
const API_URL = process.env.NEXT_PUBLIC_API_URL;
console.log(API_URL);
const axiosApi = axios.create({
    baseURL: API_URL
  });
  
  axiosApi.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  //pass new generated access token here
// Bearer Access Token
/* const setAccessToken = () => {
    const localeAuth: any = localStorage.getItem("authUser");
    const authUser = localStorage.getItem("authUser")
      ? JSON.parse(localeAuth)
      : null;
  
    let token = (authUser && authUser.accessToken) || "";
    axiosApi.defaults.headers.common['Authorization'] = token? `Bearer ${token}` : accessToken;
  }; */

  export async function get(url, config= {}) {   
    if(config && config?.responseType === 'blob') {
      axiosApi.defaults.headers.common['Content-Type'] = 'blob';
    };
    return await axiosApi.get(url, { ...config }).then((response) => response.data);
  }
  
  export async function post(url, data, config = {}) { 
    return axiosApi.post(url, data, { ...config }).then((response) => response.data);
  }
  
  export async function put(url, data, config = {}) {
    return axiosApi.put(url, data, { ...config }).then((response) => response.data);
  }
  
  export async function patch(url, data, config = {}) {
    return axiosApi.patch(url, data, { ...config }).then((response) => response.data);
  }
  
  export async function del(url, config = {}) {
    return await axiosApi.delete(url, { ...config }).then((response) => response.data);
  }