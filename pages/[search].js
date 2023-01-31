import { useRouter } from "next/router";
import React from "react";

const index = ({ query }) => {
    /* const {query} = useRouter().router.query
    const  =  */
    console.log(query)
  return <div>{query}</div>;
};

index.getInitialProps = async ({ query: {query} }) => {
    return { query };
  };

export default index;
