import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { FormContext } from "../lib/FormContext";
import Blogs from "./blogs/blogs";
import Loading from "./loading";

const index = ({ query }) => {
  const {
        formValues,
        setFormValues,
        message,
        setMessage,
        data,
        filteredData,
        setFilteredData,
        error,
        isLoading,
        currentPage,
        setCurrentPage,
        handleNextButtonClick,
        handlePreviousButtonClick,
        paginatedData,
        pageSize
  } = useContext(FormContext);


  useEffect(() => {
    setCurrentPage(0);

    if (!formValues) {
      setFilteredData(data);
      return;
    }

    const filter = data?.filter(
      (post) =>
        post?.title?.toLowerCase().includes(formValues.toLowerCase()) ||
        (post?.author &&
          post?.author?.name
            ?.toLowerCase()
            .includes(formValues.toLowerCase())) ||
        (post?.categories &&
          post?.categories
            .map((category) => category?.title?.toLowerCase())
            .some((title) => title?.includes(formValues.toLowerCase())))
    );
    if (filter?.length !== 0) {
      setFilteredData(filter);
      setMessage(`We found over ${filter?.length} results for "${formValues}"`);
      console.log("form f", formValues.length);
    } else {
      setMessage(
        `Sorry, the requested "${formValues}" was not found! \n Please check out other available blogs to read`
      );
      setFilteredData(data);
      console.log("form z", formValues.length);
    }
    
  }, [formValues, data]);
  console.log(error);
  if (error) {
      return <div>error found</div>;
    }

  if (isLoading) {
    return (
      <div><Loading></Loading></div>
    );
  }

  if (!filteredData) return <p>No profile Data</p>;

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

index.getInitialProps = async ({ query: { query } }) => {
  return { query };
};

export default index;
