import Router from "next/router";
import React, { createContext, useEffect, useState } from "react";

export const FormContext = createContext();

export const FormProvider = (props) => {
  const [formValues, setFormValues] = useState("");
  const [message, setMessage] = useState(null);

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
        formValues,
        handleChange,
        handleSubmit,
        setMessage,
        message,
      }}
    >
      {props.children}
    </FormContext.Provider>
  );
};
