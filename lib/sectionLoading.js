import React from "react";

export const SectionLoading = () => {
  return (
    <section className="about-section py-4 px-2 sm:px-3 md:px-5 lg:px-52 bg-white">
      <div>
        <div className="lg:grid lg:grid-cols-3 gap-6 shadow rounded-l bg-[#f5f6fa] ">
          <div className="lg:col-span-3 xl:col-span-2 object-fill rounded-l flex justify-center items-center  h-96 w-full bg-gray-300  animate-pulse">
            <svg
              className="w-12 h-12 text-gray-200 "
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 640 512"
            >
              <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
            </svg>
          </div>
          <div className="lg:col-span-3 xl:col-span-1 flex flex-col justify-end items-center w-full py-2 md:py-6 p-2 md:pr-6 gap-y-2 ">
            <div className="w-5/6 h-7 animate-pulse bg-gray-200 rounded-2xl"></div>
            {/* Social Link */}
            <div className="flex gap-2">
              {[{}, {}, {}, {}, {}]?.map((data, index) => (
                <div key={index}>
                  <div className="w-[30px] h-[30px] bg-gray-300 aspect-square rounded-full shadow flex justify-center items-center animate-pulse">
                    <svg
                      className="w-3 h-3 text-gray-200 "
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 640 512"
                    >
                      <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 mx-2 xl:mx-40 ">
          <div className="h-3 bg-gray-200 rounded-full  w-[50%] mb-3 animate-pulse"></div>

          <div className="h-2.5 bg-gray-200 rounded-full  w-[100%] mb-1 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[100%] mb-1 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[90%] mb-1 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[100%] mb-1 animate-pulse"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[100%] mb-1 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
