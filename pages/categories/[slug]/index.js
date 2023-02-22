
import moment from "moment";
import { groq } from "next-sanity";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FormContext } from "../../../lib/FormContext";
import { client } from "../../../lib/sanity.client";
import urlFor from "../../../lib/urlFor";
import style from "../../blogs/Blog.module.css";
import ClientSideRoute from "../../../lib/ClientSideRoute";
import Loading from "../../loading";


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

const pageSize = 5;
export default function Index ({ category }){


  const {socialMedia} = useContext(FormContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriesToInclude, setCategoriesToInclude] = useState(category);
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await client.fetch(query);

        if (!Array.isArray(result)) {
          setError("API did not return an array of data.");
          return;
        }

        const filteredData = result
          .filter(
            (post) =>
              post &&
              post.categories &&
              Array.isArray(post.categories) &&
              post.categories.some(
                (category) =>
                  category &&
                  category.slug &&
                  category.slug.current &&
                  categoriesToInclude.includes(category.slug.current)
              )
          )
          .map((post) => post);

          if (filteredData?.length !== 0) {
            setData(filteredData);
            setMessage(`We found over ${filteredData?.length} results for "${category}" Categories`);
          } else {
            setMessage(
              `We apologize, the requested "${category}" category information could not be found. Please feel free to browse our other blogs and categories for more relevant content`
            );
            setData(result);
          }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [categoriesToInclude]);

  useEffect(() => {
    setCategoriesToInclude(category);
  }, [category, data]);
/* 
  if (error) {
    return <p>{error.message}</p>;
  } */
  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }
  // if (!data) return <p>No profile Data</p>;

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
    <section>
      <Head>
        <title className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0">
          {category} category
        </title>
      </Head>

      <section
        className={`${style.blogSection} py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white`}
      >
        <header className="mb-6">
          <p className="text-gray-500 border-l-4 border-gray-500 w-fit italic pl-2 pr-3 py-1 bg-[#f5f6fa] rounded-r">
            {message}
          </p>
        </header>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 divide-slate-800 ">
          {paginatedData?.map((blog, index) => (
            <div key={index} className="md:first:col-span-2 col-span-1 group">
              <ClientSideRoute route={`/blog/${blog?.slug?.current}`}>
                <div className="flex  flex-col w-full shadow rounded   max-h-[450px] relative">
                  <div className="overflow-hidden">
                    <img
                      className="relative  rounded-t object-center object-cover w-[100%] h-[300px] group-hover:scale-105 transition-transform duration-300 ease-in-out "
                      src={urlFor(blog?.mainImage).url()}
                      alt="post 1"
                      width="100"
                      height="100"
                    />
                  </div>
                  <div className="p-2">
                    <div className="flex justify-between">
                      <span className="leading-[1] m-0 p-0">
                        <time
                          className="text-xs font-normal text-[#555555]"
                          dateTime="2017-03-27"
                          title="27 March 2017"
                        >
                          {moment(blog?._createdAt).format("MMM Do YY")}
                        </time>
                      </span>

                      {/* Social Media Link */}
                      <div className="flex gap-x-2  ">
                      {socialMedia?.slice(0, 5)?.map((data, index) => (
                        <Link key={index} href={data?.slug.current}
                        target="_blank" className="hidden group-hover:block group-hover:transition duration-300 ease-in-out">
                          <img
                            src={urlFor(data?.icon).url()}
                            alt={data?.media}
                            className="w-[15px] h-[15px] rounded-full"
                          />
                        </Link>
                      ))}
                      </div>
                    </div>
                    <Link
                      id="RouterNavLink"
                      href={`/blog/${blog?.slug?.current}`}
                      className="text-[#121212] line-clamp-2 text-[20px] leading-[1.4] font-bold p-0 m-0"
                    >
                      {blog.title}
                    </Link>
                    <div className="flex gap-x-2 pt-1">
                      {blog?.categories?.slice(0, 3).map((data, index) => (
                        <Link
                          id="RouterNavLink"
                          key={index}
                          href={`/categories/${data?.slug?.current}`}
                          className=" flex gap-1 justify-center items-center p-1 px-[6px] border rounded-3xl"
                        >
                          {data?.image && (
                            <img
                              className="object-cover w-[20px] h-[20px] justify-center rounded-full"
                              src={urlFor(data?.image).url()}
                              alt={data?.title}
                            />
                          )}
                          <div className="text-xs font-normal text-[#555555]">
                            {data?.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </ClientSideRoute>
            </div>
          ))}
        </div>

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
      </section>
    </section>
  );
};
Index.getInitialProps = async ({ query: { slug } }) => {
  return { category: slug };
};


