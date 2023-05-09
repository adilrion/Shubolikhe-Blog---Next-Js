import moment from "moment/moment";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { FormContext } from "../../lib/FormContext";
import urlFor from "../../lib/urlFor";
import ClientSideRoute from "../../lib/ClientSideRoute";
import style from "./Blog.module.css";

const Blogs = ({ data }) => {
  const { socialMedia, tag } = useContext(FormContext);
  return (
    <section>
      <section
        className={`${style.blogSection} px-3 md:px-5  lg:px-52 bg-white`}
      >
        <div className="flex flex-wrap gap-2">
          {tag?.map((data, index) => (
            <Link
              id="RouterNavLink"
              key={index}
              href={`/categories/${data?.slug?.current}`}
              className="flex  gap-1 justify-center items-center  p-1 px-[6px] border rounded-2xl"
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

        <div className="grid py-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 divide-slate-800 ">
          {data?.map((blog, index) => (
            <div key={index} className="md:first:col-span-2 group">
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
                          <Link
                            key={index}
                            href={data?.slug.current}
                            target="_blank"
                            className="hidden group-hover:block group-hover:transition duration-300 ease-in-out"
                          >
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

export default Blogs;
