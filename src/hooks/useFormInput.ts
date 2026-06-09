import { useState } from "react";

export function useFormInput(initialValue = "") {
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setValue(event.target.value);
    setMessage("");
  }

  function validate(
    validationCallback: (value: string) => string
  ) {
    const validationMessage = validationCallback(value);

    setMessage(validationMessage);

    return validationMessage === "";
  }

  function reset(newValue = "") {
    setValue(newValue);
    setMessage("");
  }

  return {
    value,
    message,
    handleChange,
    validate,
    setMessage,
    reset,
  };
}