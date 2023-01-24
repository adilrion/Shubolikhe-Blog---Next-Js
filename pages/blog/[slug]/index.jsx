import moment from "moment";
import { groq } from "next-sanity";
import BlockContent from "@sanity/block-content-to-react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { client } from "../../../lib/sanity.client";
import urlFor from "../../../lib/urlFor";
import style from "../../blogs/Blog.module.css";

const query = `*[_type == "post" && slug.current == $slug] {
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

const index = ({ slug }) => {
  const [blog, setBlog] = useState({});
  console.log(blog);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await client.fetch(query, { slug });
        if (result.length > 0) {
          setBlog(result[0]);
        } else {
          setError("No data found");
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [slug]);

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
      <div className="lg:grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-4">
          <div className="border-b  flex flex-col gap-[5px]">
            <h1 className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0">
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
          <div className="flex items-center gap-[5px]">
            <span className="text-xs font-normal text-[#555555] capitalize">
              categories:
            </span>
            {blog?.categories?.map((data, index) => (
              <Link
                key={index}
                href={`${data?.slug?.current}`}
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

        <div className="lg:col-span-3 xl:col-span-1 flex flex-col w-full gap-y-2">
          <div className="flex gap-2">
            
            {/* {blog?.map((data, index) => (
                  <Link key={index} href={data?.href} className="">
                    <img
                      className="w-[30px] h-[30px] aspect-square rounded-full shadow hover: "
                      src={data?.icon}
                      alt={data?.name}
                     
                    />
                  </Link>
                ))} */}
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
