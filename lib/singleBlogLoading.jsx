import React from 'react'

const SingleBlogLoading = () => {
  return (
    <div className="lg:grid lg:grid-cols-3 gap-4 xl:divide-x py-4 px-5 lg:px-52 bg-white">
    <div className="lg:col-span-3 xl:col-span-2 flex flex-col gap-4 animate-pulse">
      <div className="border-b  flex flex-col gap-[5px] ">
        <div className="h-4 bg-gray-200 rounded-full  w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded-full  w-full mb-2"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-32 mb-2"></div>
      </div>
      <div>
        <div className="flex justify-center items-center mb-4 h-96 w-full bg-gray-300 rounded ">
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
      </div>

      <div className="animate-pulse">
        <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-1"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-2"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-2"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-2"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-2"></div>
        <div className="h-2.5 bg-gray-200 rounded-full  w-96 mb-2"></div>
      </div>
      <div className="md:flex items-center gap-[5px] hidden md:block">
        <div className="h-[20px] p-1 bg-gray-200 rounded-full  w-32"></div>
        {[{}, {}, {}, {}, {}].map((data, index) => (
          <div
            key={index}
            className=" flex gap-1 justify-center items-center  p-1 px-[6px] border rounded-2xl"
          >
            <div className="flex flex-col justify-center items-center h-[20px] w-[20px] bg-gray-300 rounded-full overflow-hidden">
              <svg
                className="w-12 h-12 text-gray-200 rounded-full"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M480 80C480 35.82 515.8 0 560 0C604.2 0 640 35.82 640 80C640 124.2 604.2 160 560 160C515.8 160 480 124.2 480 80zM0 456.1C0 445.6 2.964 435.3 8.551 426.4L225.3 81.01C231.9 70.42 243.5 64 256 64C268.5 64 280.1 70.42 286.8 81.01L412.7 281.7L460.9 202.7C464.1 196.1 472.2 192 480 192C487.8 192 495 196.1 499.1 202.7L631.1 419.1C636.9 428.6 640 439.7 640 450.9C640 484.6 612.6 512 578.9 512H55.91C25.03 512 .0006 486.1 .0006 456.1L0 456.1z" />
              </svg>
            </div>
            <div className="w-9 h-3 animate-pulse bg-gray-200 rounded-2xl"></div>
          </div>
        ))}
      </div>
    </div>

    <div className="lg:col-span-3 xl:col-span-1 flex flex-col w-full gap-y-4 md:px-4 animate-pulse">
      <div className="pb-4 mt-4 md:mt-0">
        <p className="text-gray-500 border-l-4 border-gray-500 italic pl-2 py-3  mb-4 bg-[#f5f6fa] "></p>{" "}
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="flex justify-center items-center mb-4 h-[200px] w-[200px] shadow bg-gray-300 rounded-full ">
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

          <div className="h-4 bg-gray-200 rounded-full  w-[50%] mb-3"></div>

          <div className="h-2.5 bg-gray-200 rounded-full  w-[100%] mb-1"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[100%] mb-1"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[90%] mb-1"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[80%] mb-1"></div>
          <div className="h-2.5 bg-gray-200 rounded-full  w-[70%] mb-1"></div>
        </div>
      </div>

      <div>
        <p className="text-gray-500 border-l-4 border-gray-500 italic pl-2 py-3 mb-4 bg-[#f5f6fa] "></p>
        {[{}, {}, {}, {}, {}]?.map((data, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-1 mb-3 border-b pb-1 group"
          >
            <div className="h-4 bg-gray-200 rounded-full  w-full mb-1"></div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-1"></div>
            <div className="h-2.5 bg-gray-200 rounded-full  w-full mb-1"></div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}

export default SingleBlogLoading