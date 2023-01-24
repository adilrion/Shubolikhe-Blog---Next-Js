import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity.client";
import Blogs from "./blogs";
import style from "./Blog.module.css";

const query = groq`
*[_type == "post"]{
    ...,
    title,
    author->,
    categories[]->{
      slug,
      image,
      title,
    }
} | order(_createAt desc)
`;

const BlogPages = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(query);
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, []);

  if(error) {
    return <div>{error}</div>
  }

  return (
    <>
      <Blogs data={data} isLoading={isLoading} error={error}></Blogs>
    </>
  );
};

export default BlogPages;
