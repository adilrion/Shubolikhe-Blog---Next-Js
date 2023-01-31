import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { FormContext } from "./FormContext";

const SearchBar = () => {
  const router = useRouter();
  const { formValues, handleChange, handleSubmit, setFormValues } =
    useContext(FormContext);

  useEffect(() => {
    setFormValues(router?.query?.query || "");
  }, [router.query.query]);

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="shadow p-4 rounded-2xl border flex justify-between items-center"
      >
        <input
          type="text"
          name="query"
          className="focus:outline-none p-2 w-64 rounded-2xl"
          placeholder="Search by title, author, categories"
          value={formValues}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="ml-2 p-2 rounded-lg bg-indigo-500 text-gray-500"
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
    </div>
  );
};

export default SearchBar;
