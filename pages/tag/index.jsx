import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FormContext } from "../../lib/FormContext";
import { client } from "../../lib/sanity.client";
import urlFor from "../../lib/urlFor";





const Tag = () => {


  const{tag, isLoading, error}=useContext(FormContext)
  console.log(tag)

 

  
  return (
    <section className="py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
      <header>
        
        <p className="text-gray-500 border-l-4 border-gray-500 w-fit italic pl-2 pr-3 py-1 bg-[#f5f6fa] rounded-r">
        Category
          </p>
      </header>
      <div className="flex flex-wrap gap-5 mt-4">
        {tag?.map((data, index) => (
          <Link id="RouterNavLink"
          key={index}
          href={`/categories/${data?.slug?.current}`}
            className=" shadow w-[250px] h-[250px] rounded grow hover:bg-[#f5f6fa] flex flex-col justify-center items-center gap-5"
          >
             {data?.image && (
              <img
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
