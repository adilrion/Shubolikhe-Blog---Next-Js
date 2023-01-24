import moment from "moment";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { client } from "../../../lib/sanity.client";
import urlFor from "../../../lib/urlFor";
import style from "../../blogs/Blog.module.css";

const index = () => {
  const [blog, setBlog] = useState(null);
  console.log(blog);
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);
  const query = groq`
  *[_type == "post" && slug.current == $slug][0]
 {
    ...,
    title,
    author->,
    categories[]->{
      slug,
      image,
      title,
    }
}
`;
  useEffect(() => {
    client
      .fetch(query, { slug })
      .then((res) => {
        setBlog(res);

        // setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  return (
    <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
      <div>
        <div>
          {/* bg-[#f5f6fa]  */}
          <div className="lg:grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-3 xl:col-span-2">
              <div className="border-b mb-4 pb-4 flex flex-col gap-[5px]">
                <h1 className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0">
                  {blog?.title}
                </h1>
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
                    className=" object-fill rounded-t md:rounded-t-none md:rounded-l max-h-[500px] h-full w-full"
                    src={urlFor(blog?.mainImage).url()}
                    alt="post 1"
                    width="100"
                    height="100"
                  />
                )}
              </div>
            </div>

            <div className="lg:col-span-3 xl:col-span-1 flex flex-col justify-end items-center w-full py-2 md:py-6 p-2 md:pr-6 gap-y-2">
              {/* Social Link */}
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
        </div>
      </div>
    </section>
  );
};

export default index;
