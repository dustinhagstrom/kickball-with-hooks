import { useState, useEffect } from "react";
import { isAlpha, isAlphanumeric, isEmail, isStrongPassword } from "validator";
import useFetchApi from "./useFetchApi";

function UserInputFields(inputType) {
  const [value, setValue] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

  const [{ isLoading }] = useFetchApi();

  function onChange(e) {
    let value = e.target.value;
    setValue(value);

    checkInput(value);
  }

  function clearInput() {
    setValue("");
  }

  function checkInput(value) {
    console.log(inputType);
    if (value.length === 0) {
      console.log(value);
      setIsError(true);
      setErrorMessage(`${inputType} is required`);
      setIsDisabled(true);
    } else if (inputType === "firstName" || inputType === "lastName") {
      if (!isAlpha(value)) {
        console.log("hey bud");
        setIsError(true);
        setErrorMessage(`${inputType} can only have letters!`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "email") {
      if (!isEmail(value)) {
        setIsError(true);
        setErrorMessage(`${inputType} is not a valid email!`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "username") {
      if (!isAlphanumeric(value)) {
        setIsError(true);
        setErrorMessage(`${inputType} can only have alphanumeric characters!`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "password") {
      if (!isStrongPassword(value)) {
        setIsError(true);
        setErrorMessage(
          `Password must be at least 8 characters long, have at least one uppercase and lowercase letter, and contain at least one special character.`
        );
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    } else if (inputType === "confirmPassword") {
      let passwordInputField = document.querySelector("#password");
      if (!isStrongPassword(value)) {
        setIsError(true);
        setErrorMessage(
          `Password must be at least 8 characters long, have at least one uppercase and lowercase letter, and contain at least one special character.`
        );
        setIsDisabled(true);
      } else if (value !== passwordInputField.value) {
        setIsError(true);
        setErrorMessage(`Your passwords do not match.`);
        setIsDisabled(true);
      } else {
        setIsError(false);
        setErrorMessage(``);
        setIsDisabled(false);
      }
    }
  }

  return [value, onChange, isError, errorMessage, isDisabled, clearInput];
}

export default UserInputFields;
