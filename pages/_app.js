import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from "next/router";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Login from '../pages/user/login';
import '../styles/globals.css';
import Axios from '../utils/axios';
import UserContext from './../components/context/userContext';
import Layout from '/components/Layout';

const MyApp = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
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
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          />

        </>
      );
    }
  }

  return (
    <>
    <UserContext.Provider>
        <Layout>
          <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          />
        </Layout>
        </UserContext.Provider>
    </>
  );
};
export default MyApp;