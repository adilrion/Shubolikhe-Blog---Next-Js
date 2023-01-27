"client side";

import { data } from "autoprefixer";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
import { groq } from "next-sanity";
import React, { useEffect, useState } from "react";
import { client } from "../../../lib/sanity.client";
import urlFor from "../../../lib/urlFor";
import style from "../../blogs/Blog.module.css";
import ClientSideRoute from "../../clientSideRoute";
import Head from "next/head";

const social = [
  {
    name: "facebook",
    href: "#",
    icon: "https://www.edigitalagency.com.au/wp-content/uploads/Facebook-logo-blue-circle-large-transparent-png.png",
  },
  {
    name: "linkedin",
    href: "#",
    icon: "https://w7.pngwing.com/pngs/402/997/png-transparent-linkedin-logo-computer-icons-facebook-user-profile-facebook-blue-angle-text.png",
  },
  {
    name: "pinterest",
    href: "#",
    icon: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png",
  },
  {
    name: "twitter",
    href: "#",
    icon: "https://w7.pngwing.com/pngs/421/879/png-transparent-twitter-logo-social-media-iphone-organization-logo-twitter-computer-network-leaf-media.png",
  },
];
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
const index = ({ category }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categoriesToInclude, setCategoriesToInclude] = useState(category);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await client.fetch(query);
        console.log("total", result);

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

        console.log("filtered", filteredData);
        setData(filteredData);
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
  }, [category]);

  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoading) {
    return (
      <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
        <div className="flex items-center h-14 animate-pulse w-full  py-2 border-b pl-2 bg-[#f5f6fa] mb-6">
          <div className="h-4 bg-gray-200 rounded-full  w-[30%]"></div>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1  md:gap-6 animate-pulse">
          {[{}, {}, {}, {}, {}].map((data, index) => (
            <div
              key={index}
              role="status"
              className="p-4 w-full first:col-span-2 rounded border border-gray-200 shadow animate-pulse md:p-6 "
            >
              <div className="flex justify-center items-center mb-4 h-48 bg-gray-300 rounded ">
                <svg
                  className="w-12 h-12 text-gray-200 "
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 640 512"
                >
                  <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                </svg>
              </div>
              <div className="flex justify-between gap-10">
                <div className="h-2 bg-gray-200 rounded-full  w-48 mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full w-20  mb-4"></div>
              </div>
              <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-200 rounded-full "></div>
              <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2 mt-2"></div>

              <span className="sr-only">Loading...</span>
            </div>
          ))}
        </div>
      </section>
    );
  }
  return (
    <section>
      <Head>
        <title className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0">
          Exploring the {category} category
        </title>
      </Head>

      <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
        <header className="mb-6">
          <h1 className="text-[#2c2c2c] text-[20px]  md:text-[40px] capitalize font-serif leading-[1.4] w-full text-center md:text-start py-2 border-b pl-2 bg-[#f5f6fa]">
            Exploring the {category} category
          </h1>
        </header>
        <div className="grid md:grid-cols-3 sm:grid-cols-1  md:gap-6 divide-slate-800 ">
          {data?.map((blog, index) => (
            <div
              key={index}
              className="first:col-span-2 group"
            >
              <ClientSideRoute route={`/blog/${blog?.slug?.current}`}>
                <div className="flex  flex-col w-full shadow rounded   max-h-[450px] relative">
                  <div className="overflow-hidden">
                    <Image
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
                        {social.map((data, index) => (
                          <div key={index} className="hidden group-hover:block group-hover:transition duration-300 ease-in-out">
                            <img
                              src={data.icon}
                              alt={data.name}
                              className="w-[15px]"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Link
                      href={`/blog/${blog?.slug?.current}`}
                      className="text-[#121212] line-clamp-2 text-[20px] leading-[1.4] font-bold p-0 m-0"
                    >
                      {blog.title}
                    </Link>
                    <div className="flex gap-x-2 pt-1">
                      {blog?.categories?.slice(0, 3).map((data, index) => (
                        <Link
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
      </section>
    </section>
  );
};
index.getInitialProps = async ({ query: { slug } }) => {
  return { category: slug };
};

export default index;
