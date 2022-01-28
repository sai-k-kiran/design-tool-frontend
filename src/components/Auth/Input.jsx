import React from "react";

function Input({
  value,
  name,
  type,
  handlechange,
  placeholder,
  reference,
  error,
  submit,
  warning,
}) {
  return (
    <>
      <input
        onChange={handlechange}
        ref={reference}
        value={value}
        name={name}
        type={type}
        placeholder={placeholder}
        required
      />
      <p
        className={
          submit && value == "" ? "errorMessage true" : "errorMessage false"
        }
      >
        {warning}
      </p>
    </>
  );
}

export default Input;
