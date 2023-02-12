import Head from "next/head";
import Footer from "../components/footer/Footer";
import Navigation from "../components/navbar/navigation";
import { FormProvider } from "../lib/FormContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Shubolikhe.Blog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="favicon icon" type="image/x-icon" href="/favicon.ico" />

      </Head>
      <FormProvider>
        <div className="max-w-screen-2xl">
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </div>
      </FormProvider>
    </>
  );
}

export default MyApp;
