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

const aboutMe = [
  {
    img: "https://fi-hatchbox-production-uploads.s3.amazonaws.com/posts/44299297_s.jpg",
    excerpt: `Writing has such a power to aid someone to express almost all the
  feelings one experiences or may perceive, so I have chosen it. I
  want my thoughts to exist somewhere since human brain has
  limitations and we tend to forget things. Hope this will be a
  pleasant journey of journalizing my scribbled thoughts.`,
    details: `WI like to observe entities both living and non-living, this leads me to give shapes to my own ideas. I try to remain open to multiple interpretations. I like to talk. In this blog, I am writing about
  various things from my perspective/s so that I can talk to people,
  stay connected with the growing world. I like to observe entities both living and non-living, this leads me to give shapes to my own ideas. I try to remain open to multiple interpretations. I like to talk. In this blog,`,
  },
];

const About = () => {
  return (
    <>
      <section className="about-section py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
        {aboutMe.map((data) => (
          <div>
            <div className="lg:grid lg:grid-cols-3 gap-6 shadow rounded bg-[#f5f6fa]">
              <img
                className="lg:col-span-3 xl:col-span-2 object-fill rounded-t md:rounded-t-none md:rounded-l max-h-[500px] h-full w-full"
                src={data?.img}
                alt="about me"
              />
              <div className="lg:col-span-3 xl:col-span-1 flex flex-col justify-end items-center w-full py-2 md:py-6 p-2 md:pr-6 gap-y-2 ">
                <h1 className="text-[#2c2c2c] text-[35px] md:text-[40px] uppercase font-serif leading-[1.4] border-b w-full text-center">
                  About Me
                </h1>

                <div className="text-center text-[#121212] text-[17px]">
                  <p>{data?.excerpt}</p>
                </div>
                {/* Social Link */}
                <div className="flex gap-2">
                  {social.map((data) => (
                    <Link href={data.href} className="">
                      <img
                        className="w-[30px] h-[30px] aspect-square rounded-full shadow hover: "                        src={data?.icon}
                        alt={data.name}
                       
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-6 mx-2 xl:mx-40">
              <p
                className=" first-letter:text-5xl first-letter:font-bold first-letter:text-[#b70038] first-letter:mr-3 first-letter:float-left first-letter:leading-[1.1] text-[#121212] text-[17px]"
              >
                {data?.details}
              </p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default About;
