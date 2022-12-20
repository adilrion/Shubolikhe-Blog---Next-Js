// client.js
import {createClient} from 'next-sanity'
const client = createClient({
  projectId: "us4l28dx", //2omp863o
  dataset: "production", 
  useCdn: false 
})


export default client;