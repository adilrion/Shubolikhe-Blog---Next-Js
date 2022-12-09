import React from "react";
import Link from "next/link";
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

const Footer = () => {
  return (
    <>
      <footer className="py-16 px-5  lg:px-52  bg-[#f5f6fa] sm:px-10 mt-10">
        <div className="md:grid lg:grid-cols-3 md:grid-cols-2 md:gap-10">
          <div className="col-span-1 md:col-span-2 lg:col-span-1 mb-6 md:mb-0">
            <Link
              href="#"
              target="_blank"
              className="flex items-center text-4xl font-extrabold"
            >
              <h1 className=" text-[#b70038] text-[35px] md:text-[30px] uppercase  font-serif leading-[1]  w-full">
                Shubolikhe.Blog
              </h1>
            </Link>
          </div>
          <div className="md:col-span-2 lg:col-span-2">
            <div className="grid md:grid-cols-3 grid-cols-2 md:gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h3 className="text-[#121212] text-[15px] uppercase font-serif mb-3 leading-[1.4] font-bold p-0 m-0">
                  Tag
                </h3>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="/tag-blog/Review"
                      className="hover:text-[#b70038] text-[#222222]"
                    >
                      Review
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/tag-blog/Food"
                      className=" hover:text-[#b70038] text-[#222222]"
                    >
                      Food
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/tag-blog/Nature"
                      className=" hover:text-[#b70038] text-[#222222]"
                    >
                      Nature
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/tag-blog/Travel"
                      className=" hover:text-[#b70038] text-[#222222]"
                    >
                      Travel
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-[#121212] text-[15px] uppercase font-serif mb-3 leading-[1.4] font-bold p-0 m-0">
                  Navigation
                </h3>
                <ul>
                  <li className="mb-1">
                    <Link
                      href="/about"
                      className="hover:text-[#b70038]  text-[15px] text-[#222222]"
                    >
                      About
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/blog"
                      className=" hover:text-[#b70038] text-[15px] text-[#222222]"
                    >
                      Tags
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/tag-blog/Thoughts"
                      className=" hover:text-[#b70038] text-[15px] text-[#222222]"
                    >
                      Thoughts
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link
                      href="/contact"
                      className=" hover:text-[#b70038] text-[15px] text-[#222222]"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1 py-5 md:py-0">
                <div
                  htmlFor="email-adress-icon"
                  className="text-[#121212] text-[15px] uppercase font-serif mb-3 leading-[1.4] font-bold p-0 m-0"
                >
                  Get more updates...
                </div>

                <div className="relative mt-1">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 "
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="email-adress-icon"
                    className="bg-gray-50 border text-gray-900 text-sm rounded block w-full pl-8 p-2  border-[#b70038] placeholder-gray-400  focus:outline-none"
                    placeholder="shubolikhe@blog.com"
                  />
                </div>
                <button
                  type="button"
                  className="text-white rounded text-[15px] w-full mt-3 py-2 text-center mr-2 mb-1 bg-[#b70038] "
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6  border-gray-700 lg:my-5" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center ">
            © 2022{" "}
            <Link href="home" className="hover:text-[#b70038]">
              Shubolikhe.blog
            </Link>
            . All Rights Reserved.
          </span>

          <div className="flex gap-2">
            {social.map((data) => (
              <Link href={data.href} className="">
                <img
                  className="w-[30px] h-[30px] aspect-square rounded-full shadow hover: "
                  src={data?.icon}
                  alt={data.name}
                  srcset=""
                />
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
