import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import BlogLoading from "../../lib/BlogLoading";
import { client } from "../../lib/sanity.client";
import Blogs from "./blogs";

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

const pageSize = 5;

const BlogPages = () => {
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await client.fetch(query);
        setData(result);
        setFilteredData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
      return;
    }

    const filter = data?.filter(
      (post) =>
        post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post?.author &&
          post?.author?.name
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())) ||
        (post?.categories &&
          post?.categories
            .map((category) => category?.title?.toLowerCase())
            .some((title) => title?.includes(searchTerm.toLowerCase())))
    );
    if (filter.length !== 0) {
      setFilteredData(filter);
      setNotFound(null);
    } else {
      setNotFound(
        `Sorry, the requested "${searchTerm}" was not found! \n Please check out other available blogs to read`
      );
      setFilteredData(data);
    }
  }, [searchTerm, data]);

  if (error) {
    return <div>{error}</div>;
  }

  if (isLoading) {
    return <BlogLoading />;
  }

  if (!filteredData) return <p>No profile Data</p>;

  const paginatedData = filteredData.slice(
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0);
  };

  console.log(paginatedData.length);

  return (
    <>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          className="w-64 p-2 rounded-lg"
          placeholder="Search by title, author, categories"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {notFound && (
        <div className="py-4 px-5 lg:px-52 bg-white">
          <p className="text-gray-500 border-l-4 border-gray-500 w-fit italic pl-2 pr-3 py-1 bg-[#f5f6fa] rounded-r">
            {notFound}
          </p>
        </div>
      )}
      <Blogs data={paginatedData}></Blogs>

      {filteredData.length > pageSize && (
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
