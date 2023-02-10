import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity.client";
import urlFor from "../../lib/urlFor";





const categoryQuery = groq`
*[_type == "category"]{
  title,
  image,
  slug, 
}
`;
const Tag = () => {

  const [data, setData] = useState(null);
  console.log("🚀 ~ file: index.jsx:39 ~ Tag ~ data", data)
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const result = await client.fetch(categoryQuery);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  
  return (
    <section className="py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
      <header>
        
        <p className="text-gray-500 border-l-4 border-gray-500 w-fit italic pl-2 pr-3 py-1 bg-[#f5f6fa] rounded-r">
        Category
          </p>
      </header>
      <div className="flex flex-wrap gap-5 mt-4">
        {data?.map((data, index) => (
          <Link id="RouterNavLink"
          key={index}
          href={`/categories/${data?.slug?.current}`}
            className=" shadow w-[250px] h-[250px] rounded grow hover:bg-[#f5f6fa] flex flex-col justify-center items-center gap-5"
          >
             {data?.image && (
              <Image
              className="w-[70px] h-[70px] rounded"
                src={urlFor(data?.image).url()}
                alt={data?.title}
                width="100"
                height="100"
              />
            )}
            <h1 className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0">
              {data?.title}
            </h1>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Tag;
