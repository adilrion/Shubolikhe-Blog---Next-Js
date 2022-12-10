import Image from "next/image";
import Link from "next/link";
import React from "react";
import { contact } from "../assest/index";

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

const Contact = () => {
  return (
    <>
      <section className="about-section py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
        <div>
          <div className="lg:grid lg:grid-cols-3 gap-6 shadow rounded bg-[#f5f6fa]">
            <Image
              className="lg:col-span-3 xl:col-span-2 object-fill rounded-t md:rounded-t-none md:rounded-l max-h-[500px] h-full w-full"
              src={contact}
              alt="Contact me"
            />
            <div className="lg:col-span-3 xl:col-span-1 flex flex-col justify-end items-center w-full py-2 md:py-6 p-2 md:pr-6 gap-y-2">
              <h1 className="text-[#2c2c2c] text-[35px] md:text-[40px] uppercase font-serif leading-[1.4] border-b w-full text-center">
                Contact me
              </h1>

              {/* Social Link */}
              <div className="flex gap-2">
                {social.map((data) => (
                  <Link href={data.href} className="">
                    <img
                      className="w-[30px] h-[30px] aspect-square rounded-full shadow hover: "
                      src={data?.icon}
                      alt={data.name}
                     
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 mx-2 xl:mx-40">
            <div>
              <p className=" first-letter:text-5xl first-letter:font-bold first-letter:text-[#b70038] first-letter:mr-3 first-letter:float-left first-letter:leading-[1.1] text-[#121212] text-[17px]">
                Trying to reach me? Then arrange some good words and develop
                some perfect sentences. Now? Just through at to me. I may or may
                not check them out on a good day.
              </p>
            </div>
            <form>
            <div className="relative z-0 mb-6 mt-10 w-full group">
              <input
                type="text"
                name="floating_first_name"
                id="floating_first_name"
                className="block py-2.5 px-0 w-full text-md text-[#2e2e2eee] bg-transparent border-0 border-b-2 rounded-b-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#b70038] peer"
                placeholder=" "
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
                name="floating_email"
                className="block py-2.5 px-0 w-full text-md text-[#2e2e2eee] bg-transparent border-0 border-b-2 rounded-b-md border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#b70038] peer"
                placeholder=" "
                required=""
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
                name="floating_email"
                className="block py-2.5 px-0 text-md w-full text-md text-[#2e2e2eee] bg-transparent border-0 border-b-2 rounded-b-md  appearance-none border-gray-300 focus:outline-none focus:ring-0 focus:border-[#b70038] peer"
                placeholder=" "
                required=""
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
              className="text-white bg-[#b70038]  focus:ring-4 focus:ring-[#b70038] font-medium text-sm w-full sm:w-auto px-5 py-2.5 text-center text-[17px] rounded"
            >
              Send Me Your Letter Combinations
            </button>
          </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
