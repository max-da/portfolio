import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout2 from '../components/Layout2'
import { ToggleContextProvider } from '../utils/overlayContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToggleContextProvider>
      <Layout2>
        <Component {...pageProps} />
      </Layout2>
    </ToggleContextProvider>

  )
}

export default MyApp
