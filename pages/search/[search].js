import React from 'react'

const index = ({ slug }) => {
  return (
    <div>index {slug}</div>
  )
}
index.getInitialProps = async ({ query: { slug } }) => {
    return { slug };
  };
export default index