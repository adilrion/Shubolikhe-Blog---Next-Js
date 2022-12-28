import Link from "next/link";
import Image from "next/image";
import React from "react";
import style from "./Blog.module.css";
import urlFor from "../../lib/urlFor";
import moment from "moment/moment";

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

const Blogs = ({ data, isLoading }) => {
  console.log(data, isLoading);

  if (isLoading) {
    return (
      <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
        <div className="grid md:grid-cols-3 sm:grid-cols-1  md:gap-6 animate-pulse">
          {[{}, {}, {}, {}, {}, {}].map((blog) => (
            <div
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
              <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>

              <span className="sr-only">Loading...</span>
            </div>
          ))}
        </div>
      </section>
    );
  }
  if (!data) return <p>No profile Data</p>;

  return (
    <section>
      <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
        <div className="grid md:grid-cols-3 sm:grid-cols-1  md:gap-6 divide-slate-800 ">
          {data?.map((blog) => (
            <Link
              key={blog?.slug?.current}
              href={`${blog?.slug?.current}`}
              className="flex flex-col col-span-1 w-full shadow rounded group first:col-span-2 max-h-[450px] relative"
            >
              <div className="">
                <Image
                  className="rounded-t object-cover w-[100%] h-[300px]"
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
                    {social.map((data) => (
                      <div className="hidden group-hover:block group-hover:transition duration-300 ease-in-out">
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
                  href={`${blog.slug?.current}`}
                  className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0"
                >
                  {blog.title}
                </Link>

                <br />
                <div className="flex gap-x-2">
                  {blog?.categories?.slice(0, 3).map((data) => (
                    <Link
                      href="#"
                      className=" flex gap-1 justify-center items-center  p-1 border"
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
            </Link>
          ))}
        </div>
      </section>
    </section>
  );
};

export default Blogs;
