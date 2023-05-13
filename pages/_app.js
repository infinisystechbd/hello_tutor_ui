import Layout from '/components/Layout';
import '../styles/globals.css'
import Script from "next/script"; 
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

const MyApp = ({ Component, pageProps }) => {



  return (
    <>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      
    </>
  );
};
export default MyApp;