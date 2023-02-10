import { groq } from "next-sanity";
import Router, { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { client } from "./sanity.client";

export const FormContext = createContext();

const query = groq`
*[_type == "post"]{
    ...,
    title,
    author->,
    categories[]->{
      slug,
      image,
      title,
    }
} | order(_createdAt desc)
`;

const pageSize = 5;

export const FormProvider = (props) => {
  const [formValues, setFormValues] = useState("");
  const [message, setMessage] = useState(null);
  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const result = await client.fetch(query);
        setData(result);
        setFilteredData(result);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

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

  

  const paginatedData = filteredData?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handleNextButtonClick = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousButtonClick = (event) => {
    event.preventDefault();
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };


 useEffect(() => {
    if (!formValues) {
      setMessage(null);
    }
  }, [formValues]);

  const handleChange = (event) => {
    setFormValues(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted with value: ", formValues);
    setFormValues(formValues);
    Router.push(`/search?query=${formValues}`);
  };

  return (
    <FormContext.Provider
      value={{
        handleChange,
        handleSubmit,
        formValues,
        setFormValues,
        message,
        setMessage,
        data,
        setData,
        filteredData,
        setFilteredData,
        error,
        setError,
        isLoading,
        setIsLoading,
        currentPage,
        setCurrentPage,
        handleNextButtonClick,
        handlePreviousButtonClick,
        paginatedData,
        pageSize
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};