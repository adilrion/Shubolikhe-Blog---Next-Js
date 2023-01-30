import Image from "next/image";
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
} from "../assest";

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

const Tag = () => {
  return (
    <section className="py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
      <header>
        <h1 className="text-[#2c2c2c] text-[20px]  md:text-[40px] uppercase font-serif leading-[1.4] w-full text-center md:text-start py-2 border-b pl-2 bg-[#f5f6fa]">
          Category
        </h1>
      </header>
      <div className="flex flex-wrap gap-5 mt-4">
        {tag.map((data, index) => (
          <Link id="RouterNavLink"
          key={index}
            href={data?.href}
            className=" shadow w-[250px] h-[250px] rounded grow hover:bg-[#f5f6fa] flex flex-col justify-center items-center gap-5"
          >
            <Image
              className="w-[70px] h-[70px]"
              src={data?.img}
              alt={data?.tag}
            />
            <h1 className="text-[#121212] text-[20px] leading-[1.4] font-bold p-0 m-0">
              {data?.tag}
            </h1>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Tag;
