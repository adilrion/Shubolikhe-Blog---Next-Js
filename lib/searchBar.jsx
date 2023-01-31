import React, { useContext } from 'react';
import { FormContext } from './FormContext';

const SearchBar = () => {

  const { formValues, handleChange, handleSubmit } = useContext(FormContext);
  
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          className="w-64 p-2 rounded-lg"
          placeholder="Search by title, author, categories"
          value={formValues}
          onChange={handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default SearchBar
