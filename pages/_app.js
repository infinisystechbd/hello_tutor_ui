import Layout from '/components/Layout';
import '../styles/globals.css'
import Script from "next/script"; 
import Axios from '../utilss/axios';
import Login from '../pages/user/login'
import { useRouter } from "next/router";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';


const MyApp = ({ Component, pageProps }) => {
  const { http, user, token, logout } = Axios();
  const router = useRouter();



  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  // useEffect(() => {
  //   if (user) {
  //     const decodedJwt = parseJwt(token);
  //     if (decodedJwt?.exp * 1000 < Date.now()) {
  //       logout();
  //     }
  //   }
  // }, [user, token, router.pathname]);

  // if (typeof window !== "undefined") {
  //   if (router.pathname === "/") {
  //     router.replace("/dashboard");
  //   }
  // }  


  if (typeof window !== "undefined") {
    if (!token) {
      return (
        <>
          <Login />
          {/* <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          /> */}

        </>
      );
    }
  }

  return (
    <>
        <Layout>
          <Component {...pageProps} />
          {/* <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          /> */}
        </Layout>
      
    </>
  );
};
export default MyApp;