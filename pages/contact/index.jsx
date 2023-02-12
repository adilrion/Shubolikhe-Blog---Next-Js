import BlockContent from "@sanity/block-content-to-react";
import Link from "next/link";

import emailjs from "emailjs-com";
import { groq } from "next-sanity";
import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../lib/FormContext";
import { client } from "../../lib/sanity.client";
import { SectionLoading } from "../../lib/sectionLoading";
import urlFor from "../../lib/urlFor";

const Contact = () => {
  const query = groq`
*[_type == "contactMe"]`;
  const { socialMedia } = useContext(FormContext);
  // Contact Section data Fetch
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

  // data fetch end

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      // send email logic
      await emailjs.send(
        "service_0ll26sg",
        "template_972f6fk",
        formData,
        "627NZaV9FgTHDFx8A"
      );
      setShowSuccessMessage(true);
    } catch (error) {
      alert(
        "An error occurred while sending your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div>
        <SectionLoading />
      </div>
    );
  }

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
            <div className="lg:col-span-3 xl:col-span-1 flex flex-col justify-end items-center w-full py-2 md:py-6 p-2 md:pr-6 gap-y-2">
              <h1 className="text-[#2c2c2c] text-[35px] md:text-[40px] uppercase font-serif leading-[1.4] border-b w-full text-center">
                {data && data?.[0].contactSection}
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
            <div>
              <div className=" first-letter:text-5xl first-letter:font-bold first-letter:text-[#b70038] first-letter:mr-3 first-letter:float-left first-letter:leading-[1.1] text-[#121212] text-[17px]">
                <BlockContent blocks={data && data?.[0].bio} />
              </div>
            </div>

            {showSuccessMessage ? (
              <p className="text-gray-500 border-l-4 border-[#00c45c] w-fit italic pl-2 pr-3 py-1 bg-[#00c45c1d] rounded-r mt-14">
                Your Mail has been sent. Thank you!
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="relative z-0 mb-6 mt-10 w-full group">
                  <input
                    type="text"
                    name="name"
                    id="floating_first_name"
                    className="block py-2.5 px-0 w-full text-md text-[#2e2e2eee] bg-transparent border-0 border-b-2 rounded-b-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#b70038] peer"
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    required=""
                  />
                  <label
                    htmlFor="floating_first_name"
                    className="absolute text-md text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#b70038]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Name
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group mt-10 md:mt-0">
                  <input
                    type="email"
                    name="email"
                    className="block py-2.5 px-0 w-full text-md text-[#2e2e2eee] bg-transparent border-0 border-b-2 rounded-b-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#b70038] peer"
                    placeholder=" "
                    required=""
                    value={formData.email}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="floating_email"
                    className="absolute text-md text-gray-500  duration-300 transform -translate-y-12 md:-translate-y-6   scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#b70038]  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-[-15px] md:peer-placeholder-shown:translate-y-0  peer-focus:scale-75 peer-focus:-translate-y-12 md:peer-focus:-translate-y-6"
                  >
                    If I were You I would enter My Email address here
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <textarea
                    rows="6"
                    type="text"
                    name="message"
                    className="block py-2.5 px-0 text-md w-full text-md text-[#2e2e2eee] bg-transparent border-0 border-b-2 rounded-b-md  appearance-none border-gray-300 focus:outline-none focus:ring-0 focus:border-[#b70038] peer"
                    placeholder=" "
                    required=""
                    value={formData.message}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="floating_email"
                    className="absolute text-md text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-[#b70038] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Insert <span className="">Letter combination</span> Here
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={
                    isSubmitting ||
                    !formData.name ||
                    !formData.email ||
                    !formData.message
                  }
                  className={`text-white bg-[#b70038]  focus:ring-4 focus:ring-[#b70038] font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center text-[17px] rounded disabled:bg-[#ff3773]`}
                >
                  Send Me Your Letter Combinations
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
