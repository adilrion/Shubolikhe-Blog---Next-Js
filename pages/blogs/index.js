import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity.client";
import Blogs from "./blogs";
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
    (async () => {
      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (error) {
    return <div>{error}</div>
  }

  if (isLoading) {
    return <BlogLoading />;
  }

  if (!data) return <p>No profile Data</p>;

  const paginatedData = data.slice(
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
      {data.length > pageSize && (
        <div className="flex justify-center items-center mt-4 gap-4  py-4 px-5 lg:px-52 bg-white">
          {currentPage !== 0 && (
            <button
              onClick={handlePreviousButtonClick}
              disabled={currentPage === 0}
              className="px-5 py-[5px] text-sm  font-medium text-[#b70038] border rounded-2xl hover:bg-gray-100"
            >
              <span className="pr-[8px] ">&lt;</span> Prev
            </button>
          )}
          <p className="px-5 py-[5px] text-sm font-medium text-gray-700 border rounded-2xl ">
            Page {currentPage + 1} of {Math.ceil(data.length / pageSize)}
          </p>
          {(currentPage + 1) * pageSize < data.length && (
            <button
              onClick={handleNextButtonClick}
              disabled={(currentPage + 1) * pageSize >= data.length}
              className="px-5 py-[5px] text-sm font-medium text-[#b70038] border rounded-2xl hover:bg-gray-100"
            >
              Next <span className="pl-[8px] ">&gt;</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default BlogPages;
