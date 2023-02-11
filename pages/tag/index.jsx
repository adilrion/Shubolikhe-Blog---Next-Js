import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { FormContext } from "../../lib/FormContext";
import { client } from "../../lib/sanity.client";
import urlFor from "../../lib/urlFor";

const Tag = () => {
  const { tag, cateIsLoading, error } = useContext(FormContext);
  console.log(tag);

  if (cateIsLoading) {
    return (
      <section className="py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
      <header>
        <p className="text-gray-500 border-l-4 border-gray-500 w-fit italic pl-2 pr-3 py-1 bg-[#f5f6fa] rounded-r">
          Category
        </p>
      </header>
      <div className="flex flex-wrap gap-5 mt-4">
        {[{},{},{},{},{},{},{},{}].map((data, index) => (
          <div
            key={index}
            className=" shadow bg-gray-100 w-[250px] h-[250px] rounded grow hover:bg-[#f5f6fa] flex flex-col justify-center items-center gap-5 animate-pulse"
          >
            <svg
            className="w-12 h-12 text-gray-200 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 640 512"
          >
            <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
          </svg>
          <div className="h-4 bg-gray-200 rounded-full  w-[50%] mb-3"></div>
          </div>
        ))}
      </div>
    </section>
    );
  }

  return (
    <section className="py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
      <header>
        <p className="text-gray-500 border-l-4 border-gray-500 w-fit italic pl-2 pr-3 py-1 bg-[#f5f6fa] rounded-r">
          Category
        </p>
      </header>
      <div className="flex flex-wrap gap-5 mt-4">
        {tag?.map((data, index) => (
          <Link
            id="RouterNavLink"
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
