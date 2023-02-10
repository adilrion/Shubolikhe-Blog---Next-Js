import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FormContext } from "./FormContext";
import style from "./Lib.module.css";
const SearchBar = () => {
  const router = useRouter();
  const { formValues, handleChange, handleSubmit, setFormValues } =
    useContext(FormContext);

  useEffect(() => {
    setFormValues(router?.query?.query || "");
  }, [router.query.query]);

  return (
    
    <form
          onSubmit={handleSubmit}
          className="group shadow rounded-full  md:rounded-2xl border flex justify-between items-center z-50 bg-white"
        >
          <input
            type="search"
            name="query"
            className="pl-2 rounded-2xl focus:outline-none hidden md:block group-hover:block hover:transition-al  transition ease-in-out delay-300  "
            placeholder="Search by title, author, categories"
            value={formValues}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="p-2 rounded-full  md:rounded-2lg   text-gray-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </form>
  );
};

export default SearchBar;
