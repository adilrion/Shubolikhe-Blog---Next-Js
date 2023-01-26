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
  const [categoriesToInclude, setCategoriesToInclude] = useState([category]);

  useEffect(() => {
    const fetchData = async () => {
        try {
          setIsLoading(true);
          const result = await client.fetch(query);
          console.log("total", result);
      
          if (!Array.isArray(result)) {
            setError("API did not return an array of data.")
            return;
          }
      
          const filteredData = result
            .filter(post => post && post.categories && Array.isArray(post.categories) && post.categories.some(category => category && category.slug && category.slug.current && categoriesToInclude.includes(category.slug.current)))
            .map(post => post);
      
          console.log("filtered", filteredData);
          setData(filteredData);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
  }, [category]);

  if (error) {
    return <p>{error.message}</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <div>{category}</div>
      <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
        <div className="grid md:grid-cols-3 sm:grid-cols-1  md:gap-6 divide-slate-800 ">
          {data?.map((blog, index) => (
            <div
              key={`${blog?.slug?.current}`}
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
    </div>
  );
};
index.getInitialProps = async ({ query: { slug } }) => {
  return { category: slug };
};

export default index;
