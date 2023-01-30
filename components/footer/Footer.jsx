import Link from "next/link";
import React from "react";
import {
  book,
  food,
  movingPicture,
  music,
  nature,
  review,
  thought,
  travel
} from "../../pages/assest";
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

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Blog", href: "/blogs", current: false },
  { name: "About", href: "/about", current: false },
  { name: "Contact", href: "/contact", current: false },
];

const tag = [
  { href: "##", tag: "Book", img: book },
  { href: "##", tag: "Music", img: music },
  { href: "##", tag: "Food", img: food },
  { href: "##", tag: "Travel", img: travel },
  { href: "##", tag: "Nature", img: nature },
  { href: "##", tag: "Thought", img: thought },
  { href: "##", tag: "Review", img: review },
  { href: "##", tag: "Moving Picture", img: movingPicture },
];

const Footer = () => {
  return (
    <>
      <footer className="md:py-16 py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-[#f5f6fa] mt-10">
        <div className="flex gap-x-8 flex-wrap  pt-5 ">
          <div className="">
            <Link id="RouterNavLink" 
              href="#"
              target="_blank"
              className="flex items-center font-extrabold"
            >
              <h1 className=" text-[#b70038] text-[15px] sm-text-[25px] pb-5 md:text-[35px] uppercase  font-serif leading-[1]  w-full">
                Shubolikhe.Blog
              </h1>
            </Link>
          </div>
          <div className="grow">
            <div className="flex gap-x-5 flex-wrap gap-y-5">
              <div className="grow">
                <h3 className="text-[#121212d8] text-[12px] uppercase font-serif mb-3 leading-[1.4] font-bold p-0 m-0">
                  Tag
                </h3>

                <div className="flex flex-col">
                  {tag?.slice(0, 4)?.map((data, index) => (
                    <Link id="RouterNavLink"
                      key={index}
                      href={data?.href}
                      className=" hover:text-[#b70038]  text-[15px] text-[#121212d8]"
                    >
                      {data?.tag}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="grow">
                <h3 className="text-[#121212d8] text-[12px] uppercase font-serif mb-3 leading-[1.4] font-bold p-0 m-0">
                  Navigation
                </h3>
                <div className="flex flex-col">
                  {navigation?.slice(0, 4)?.map((data, index) => (
                    <Link id="RouterNavLink"
                      key={index}
                      href={data?.href}
                      className="hover:text-[#b70038]  text-[15px] text-[#121212d8]"
                    >
                      {data?.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="grow">
                <div
                  htmlFor="email-adress-icon"
                  className="text-[#121212d8] text-[12px] uppercase font-serif mb-3 leading-[1.4] font-bold p-0 m-0"
                >
                  Get more updates!
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
                  className="text-white rounded text-[15px] w-full mt-3 py-2 text-center md:mr-2 mb-1 bg-[#b70038] "
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6  border-gray-300 lg:my-5" />
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-sm text-gray-500 sm:text-center ">
            © 2022{" "}
            <Link id="RouterNavLink" href="home" className="hover:text-[#b70038]">
              Shubolikhe.blog
            </Link>
            . All Rights Reserved.
          </span>

          <div className="flex gap-2">
            {social.map((data, index) => (
              <Link id="RouterNavLink" key={index} href={data.href} className="">
                <img
                  className="w-[30px] h-[30px] aspect-square rounded-full shadow hover: "
                  src={data?.icon}
                  alt={data.name}
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
