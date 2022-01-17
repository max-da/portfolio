import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout2 from '../components/Layout2'

function MyApp({ Component, pageProps }: AppProps) {
  return (
 
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
   

  )
}

export default MyApp
