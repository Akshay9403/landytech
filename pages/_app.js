import {CookiesProvider} from "react-cookie"
import '../styles/globals.css'
import 'antd/dist/antd.css';

function MyApp({Component, pageProps}) {
  return <CookiesProvider>
    <Component {...pageProps} />
  </CookiesProvider>
}

export default MyApp
