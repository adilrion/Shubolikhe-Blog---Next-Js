import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navbar/navigation";
import { FormProvider } from "../lib/FormContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>ss</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <FormProvider>
      <Navigation />
      <Component {...pageProps} />
      <Footer />
      </FormProvider>
    </>
  );
}

export default MyApp;
