import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity.client";
import Blogs from "./blogs";
import style from "./Blog.module.css";

export const query = groq`
*[_type == "post"]{
    ...,
    title,
    author->,
    categories[]->
}
`;

const BlogPages = () => {
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    client
      .fetch(query)
      .then((res) => {
        setData(res);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 

  return (
    <>
      <Blogs data={data} isLoading={isLoading}></Blogs>
    </>
  );
};

export default BlogPages;
