import Link from "next/link";
import React, { useEffect, useState } from "react";
import { facebook, linkedin, pinterest, twitter } from "../../assest";
import style from './Blog.module.css'


const index = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/blog")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, []);

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) return <p>No profile Data</p>;

  return (
    <section>
      <section className={`${style.blogSection} py-4 px-5 lg:px-52 bg-white`}>
        
        <div className="grid md:grid-cols-3 sm:grid-cols-1  md:gap-6">
          {data.slice(0, 1).map((blog) => (
            <Link
              href={`/read-blog/${blog._id}`}
              className="blog-post-card sm:col-span-1 md:col-span-2 flex flex-col"
              key={blog?._id}
            >
              <div className="blog-post-image">
                <img src={blog?.img} alt="post 1" className="m-0" />
              </div>
              <div className="blog-post-title-section">
                <div className="blog-post-title ">
                  <Link href="#" className="">
                    {blog?.category}
                  </Link>
                </div>

                <div className="blog-post-title-social-link">
                  <Link href="#">
                    <img width='100' height='100' className="social-icon" src={twitter} alt="" />
                  </Link>
                  <Link href="#">
                    <img width='100' height='100' className="social-icon" src={facebook} alt="" />
                  </Link>
                  <Link href="#">
                    <img width='100' height='100'
                      className="social-icon"
                      src={linkedin}
                      alt=""
                      srcSet=""
                    />
                  </Link>
                  <Link href="">
                    <img width='100' height='100' className="social-icon" src={pinterest} alt="" />
                  </Link>
                </div>
              </div>
              <Link href={`/read-blog/${blog._id}`} className="card-header">
                {`${blog?.title?.slice(0, 60).concat("..")}`}
              </Link>
              <div>
                <time
                  className="blog-published-time"
                  dateTime="2017-03-27"
                  title="27 March 2017"
                >
                  {blog?.date}
                </time>
              </div>
            </Link>
          ))}
          {data.slice(1, 2).map((blog) => (
            <div className="blog-post-card col-span-1" key={blog?._id}>
              <div className="blog-post-image">
                <img width='100' height='100' src={blog?.img} alt="post 1" className="m-0" />
              </div>
              <div className="blog-post-title-section">
                <div className="blog-post-title">
                  <Link href="#" className="">
                    {blog?.category}
                  </Link>
                </div>

                <div className="blog-post-title-social-link">
                  <Link href="#">
                    <img width='100' height='100' className="social-icon" src={twitter} alt="" />
                  </Link>
                  <Link href="#">
                    <img width='100' height='100' className="social-icon" src={facebook} alt="" />
                  </Link>
                  <Link href="#">
                    <img width='100' height='100'
                      className="social-icon"
                      src={linkedin}
                      alt=""
                      srcSet=""
                    />
                  </Link>
                  <Link href="#">
                    <img width='100' height='100' className="social-icon" src={pinterest} alt="" />
                  </Link>
                </div>
              </div>
              <Link href={`/read-blog/${blog._id}`} className="card-header">
                {`${blog?.title?.slice(0, 40).concat("..")}`}
              </Link>
              <div>
                <time
                  className="blog-published-time"
                  dateTime="2017-03-27"
                  title="27 March 2017"
                >
                  {blog?.date}
                </time>
              </div>
            </div>
          ))}
          {data.slice(3, data.length).map((blog) => (
            <Link
              key={blog?._id}
              href={`/read-blog/${blog._id}`}
              className="blog-post-card-section col-span-1"
            >
              <div className="blog-post-image-section">
                <img width='100' height='100' className="m-0" src={blog?.img} alt="post 1" />
              </div>
              <div className="blog-post-title-section">
                <div className="blog-post-title">
                  <Link href="#" className="">
                    {blog?.category}
                  </Link>
                </div>

                <div className="blog-post-title-social-link">
                  <Link href="#">
                    <img width='100' height='100' className="social-icon" src={twitter} alt="" />
                  </Link>
                  <Link href="facebook">
                    <img width='100' height='100' className="social-icon" src={facebook} alt="" />
                  </Link>
                  <Link href="#">
                    <img width='100' height='100'
                      className="social-icon"
                      src={linkedin}
                      alt=""
                      srcSet=""
                    />
                  </Link>
                  <Link href="#">
                    <img width='100' height='100' className="social-icon" src={pinterest} alt="" />
                  </Link>
                </div>
              </div>
              <Link href={`/read-blog/${blog._id}`} className="card-header">
                {`${blog?.title?.slice(0, 28).concat("..")}`}
              </Link>
              <div>
                <time
                  className="blog-published-time"
                  dateTime="2017-03-27"
                  title="27 March 2017"
                >
                  {blog?.date}
                </time>
              </div>
            </Link>
          ))}
        </div>

        <nav aria-label="" className="py-8">
          <ul className="inline-flex items-center -space-x-px">
            <li>
              <button
                onClick={() => setPage(page - 1)}
                className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 "
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
           

            <li>
              <button
                onClick={() => setPage(page + 1)}
                className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
              >
                <span className="sr-only">Next</span>
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </section>
  );
};

export default index;
