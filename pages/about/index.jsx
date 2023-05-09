import { groq } from "next-sanity";
import Image from "next/image";
import BlockContent from "@sanity/block-content-to-react";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { client } from "../../lib/sanity.client";
import urlFor from "../../lib/urlFor";
import { useContext } from "react";
import { FormContext } from "../../lib/FormContext";
import { SectionLoading } from "../../lib/sectionLoading";

const query = groq`
*[_type == "about"]`;

const About = () => {
  const { socialMedia } = useContext(FormContext);

  // About Section data Fetch
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <div>
        <SectionLoading />
      </div>
    );
  }

  // data fetch end
  return (
    <>
      <section className="about-section py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
        <div>
          <div className="lg:grid lg:grid-cols-3 gap-6 shadow rounded bg-[#f5f6fa]">
            {data?.[0].image && (
              <img
                className="lg:col-span-3 xl:col-span-2 object-fill rounded-t md:rounded-t-none md:rounded-l max-h-[500px] h-full w-full"
                src={urlFor(data?.[0].image).url()}
                alt="Contact me"
                width="100"
                height="100"
              />
            )}
            <div className="lg:col-span-3 xl:col-span-1 flex flex-col justify-end items-center w-full py-2 md:py-6 p-2 md:pr-6 gap-y-2 ">
              <h1 className="text-[#2c2c2c] text-[35px] md:text-[40px] uppercase font-serif leading-[1.4] border-b w-full text-center">
                {data && data?.[0].section}
              </h1>
              {/* Social Link */}
              <div className="flex gap-2">
                {socialMedia?.slice(0, 10)?.map((data, index) => (
                  <Link
                    key={index}
                    id="RouterNavLink"
                    href={data?.slug.current}
                    target="_blank"
                    className=""
                  >
                    {data?.icon && (
                      <img
                        className="w-[30px] h-[30px] aspect-square rounded-full shadow hover: "
                        src={urlFor(data?.icon).url()}
                        alt={data?.media}
                        width="100"
                        height="100"
                      />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 mx-2 xl:mx-40">
            <div className=" first-letter:text-5xl first-letter:font-bold first-letter:text-[#b70038] first-letter:mr-3 first-letter:float-left first-letter:leading-[1.1] text-[#121212] text-[17px]">
              <BlockContent blocks={data && data?.[0].bio} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
