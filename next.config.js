
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
 experimental:{
  appDir: false,
 }, 
 images:{
  domains: ["links.papareact.com", "cdn.sanity.io"]
 },
 devIndicators: {
  buildActivity: false
}

}
