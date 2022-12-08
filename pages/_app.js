import Head from 'next/head'
import Navigation from '../components/navbar/navigation'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  
  return (
    <>
    <Head>
      <title>ss</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <Navigation></Navigation>
    <Component {...pageProps} />

    </>
  )
}

export default MyApp
