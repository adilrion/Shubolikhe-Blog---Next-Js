import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity.client";
import Blogs from "./blogs";
import style from "./Blog.module.css";
import BlogLoading from "../../lib/BlogLoading";

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
} | order(_createdAt desc)
`;

const pageSize = 2;

const BlogPages = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(query);
        setData(result);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <BlogLoading/>
  }

  if (!data) return <p>No profile Data</p>;

  const paginatedData = data?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleNextButtonClick = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Blogs data={paginatedData}></Blogs>
      <div className="flex justify-between items-center mt-4 lg:grid lg:grid-cols-3 gap-4 xl:divide-x py-4 px-5 lg:px-52 bg-white">
      {currentPage !== 0 && (

        <button
          onClick={handlePreviousButtonClick}
          disabled={currentPage === 0}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-l-lg hover:bg-gray-300"
        >
          Previous
        </button>  )}
        <p className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200">
          Page {currentPage + 1} of {Math.ceil(data.length / pageSize)}
        </p>
        {(currentPage + 1) * pageSize < data.length && (
        <button
          onClick={handleNextButtonClick}
          disabled={(currentPage + 1) * pageSize >= data.length}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-r-lg hover:bg-gray-300"
        >
          Next
        </button> )}
      </div>
    </>
  );
};

export default BlogPages;
