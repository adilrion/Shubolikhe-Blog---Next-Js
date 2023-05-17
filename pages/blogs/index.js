import React, { useContext} from "react";
import { FormContext } from "../../lib/FormContext";
import Loading from "../loading";
import Blogs from "./blogs";

const BlogPages = () => {
  const {
    message,
    data,
    filteredData,
    isLoading,
    currentPage,
    handleNextButtonClick,
    handlePreviousButtonClick,
    paginatedData,
    pageSize,
  } = useContext(FormContext);

  if (isLoading) {
    return (
      <div>
        <Loading></Loading>
      </div>
    );
  }


  return (
    <>
      {message && (
        <div className="py-4 px-5 lg:px-52 bg-white">
          <p className="text-gray-500 border-l-4 border-gray-500 w-fit italic pl-2 pr-3 py-1 bg-[#f5f6fa] rounded-r">
            {message}
          </p>
        </div>
      )}
      <Blogs data={paginatedData}></Blogs>

      {filteredData?.length > pageSize && (
        <div className="flex justify-center items-center mt-4 gap-4  py-4 px-5 lg:px-52 bg-white">
          {currentPage !== 0 && (
            <button
              onClick={handlePreviousButtonClick}
              disabled={currentPage === 0}
              className="px-5 py-[5px] text-sm  font-medium text-[#b70038] border rounded-2xl hover:bg-gray-100"
            >
              <span className="pr-[8px] ">&lt;</span> Prev
            </button>
          )}
          <p className="px-5 py-[5px] text-sm font-medium text-gray-700 border rounded-2xl ">
            Page {currentPage + 1} of {Math.ceil(data.length / pageSize)}
          </p>
          {(currentPage + 1) * pageSize < data.length && (
            <button
              onClick={handleNextButtonClick}
              disabled={(currentPage + 1) * pageSize >= data.length}
              className="px-5 py-[5px] text-sm font-medium text-[#b70038] border rounded-2xl hover:bg-gray-100"
            >
              Next <span className="pl-[8px] ">&gt;</span>
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default BlogPages;
