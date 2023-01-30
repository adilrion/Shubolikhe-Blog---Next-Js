"client site";
import BlockContent from "@sanity/block-content-to-react";
import moment from "moment";
import { groq } from "next-sanity";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { client } from "../../../lib/sanity.client";
import SingleBlogLoading from "../../../lib/singleBlogLoading";
import urlFor from "../../../lib/urlFor";
import style from "../../blogs/Blog.module.css";

const query = groq`*[_type == "post" && slug.current == $slug] {
  title,
  author->,
  mainImage,
  body,
  categories[]->{
    slug,
    image,
    title,
  }
}`;

const recentQuery = groq`*[_type == "post"] | order(publishedAt desc) [0...10] { 
   ...,
    title,
    author->,
    categories[]->{
      slug,
      image,
      title,
    } 
}`;

const index = ({ slug }) => {
  const [blog, setBlog] = useState({});
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const recentBlogs = await client.fetch(recentQuery);
      setRecentBlogs(recentBlogs);
      const result = await client.fetch(query, { slug });
      if (result.length > 0) {
        setBlog(result[0]);
      } else {
        setError("No data found");
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [slug]);

  const nameRef = useRef(null);

  const handleClick = useCallback(() => {
    window.location.href = `mailto:${blog?.author?.email}`;
  }, [blog?.author?.email]);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.addEventListener("click", handleClick);
      return () => {
        if (nameRef.current) {
          nameRef.current.removeEventListener("click", handleClick);
        }
      };
    }
  }, [handleClick]);

  if (isLoading) {
    return (
      <SingleBlogLoading></SingleBlogLoading>
    );
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
      <Head>
        <title className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0">
          {blog?.title}
        </title>
      </Head>
      <div className="lg:grid lg:grid-cols-3 gap-4 xl:divide-x">
        <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-4">
          <div className="border-b  flex flex-col gap-[5px] ">
            <h1 className="text-[#121212] text-[30px] leading-[1.4] font-bold p-0 m-0">
              {blog?.title}
            </h1>

            <div>
              <span className="leading-[1] m-0 p-0">
                <time
                  className="text-xs font-normal text-[#555555]"
                  dateTime="2017-03-27"
                  title="27 March 2017"
                >
                  publish: {moment(blog?._createdAt).format("LLL")}
                </time>
              </span>
            </div>
          </div>
          <div>
            {blog?.mainImage && (
              <Image
                className=" object-fill rounded max-h-[500px] h-full w-full shadow"
                src={urlFor(blog?.mainImage).url()}
                alt={blog?.title}
                width="100"
                height="100"
              />
            )}
          </div>
          <div className="first-letter:text-5xl first-letter:font-bold first-letter:text-[#b70038] first-letter:mr-3 first-letter:float-left first-letter:leading-[1.1] text-[#121212] text-[17px]">
            <BlockContent blocks={blog?.body} />
          </div>
          <div className="md:flex items-center gap-[5px] mb-6 hidden md:block">
            <span className="text-xs font-normal text-[#555555] capitalize">
              categories:
            </span>
            {blog?.categories?.map((data, index) => (
              <Link id="RouterNavLink"
                key={index}
                href={`/categories/${data?.slug?.current}`}
                className=" flex gap-1 justify-center items-center  p-1 px-[6px] border rounded-2xl"
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

        <div className="lg:col-span-3 xl:col-span-1 flex flex-col w-full gap-y-4 md:px-4 mt-4 md:mt-0">
          <div className="   pb-4">
            <p className="text-gray-500 border-l-4 border-gray-500 italic pl-2 py-1 bg-[#f5f6fa] mb-4">
              Meet the Minds Behind the Words
            </p>
            <div className="flex flex-col gap-2 justify-center items-center">
              <div>
                {blog?.author?.image && (
                  <Image
                    className=" object-fill rounded-full h-[200px] w-[200px] shadow"
                    src={urlFor(blog?.author?.image).url()}
                    alt={blog?.title}
                    width="100"
                    height="100"
                  />
                )}
              </div>
              <h1 className="text-[17px]">
                {" "}
                <span ref={nameRef} className="cursor-pointer hover:underline">
                  {blog?.author?.name}
                </span>
              </h1>
              <div className="text-[#121212] text-[15px] line-clamp-6 text-center">
                <BlockContent blocks={blog?.author?.bio} />
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-500 border-l-4 border-gray-500 italic pl-2 py-1 mb-4 bg-[#f5f6fa]">
              Recent Insights: Our Latest Blog Posts
            </p>
            {recentBlogs &&
              recentBlogs?.map((data, index) => (
                <Link id="RouterNavLink"
                  href={`/blog/${data?.slug?.current}`}
                  key={index}
                  className="flex flex-col gap-y-1 mb-3 border-b last:border-none pb-1 group"
                >
                  <h1 className="text-[#121212] line-clamp-1 text-[20px] leading-[1.4] font-bold p-0 m-0 group-hover:underline">
                    {data.title}
                  </h1>
                  <div className="text-[#121212] text-[15px] line-clamp-2 text-start">
                    <BlockContent blocks={data?.body} />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

index.getInitialProps = async ({ query: { slug } }) => {
  return { slug };
};

export default index;
