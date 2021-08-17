import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

function useFetchApi(url) {
  const baseURL =
    process.env.NODE_ENV === //react already has this node env variable established.
    "development"
      ? "http://localhost:8080/api"
      : "DEPLOYED LOCATION";

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [callOptions, setCallOptions] = useState({});
  const [successMessageValue, setSuccessMessageValue] = useState(null);

  //can do a success toast if I want to.
  const { dispatch } = useContext(AuthContext);

  function handleAPICallSubmit(options = {}) {
    //options = {} is a default parameter that states if an options is not passed then the default value is empty obj
    setCallOptions(options);
    setIsLoading(true);
  }

  async function handleAPIFetchCall() {
    const requestOptionObj = {
      ...options,
      withCredentials: true, //this is a boolean that says we should allow credentials cross-site. this is ignored if the req origin is same as res origin.
      credentials: "include", //this allows sending cookies cross-origin. "Request.credentials"
      ...{
        headers: {
          authorization: null, //credentials are held within the cookie not auth headers
        },
      },
    };

    try {
      let response = await axios(basURL + url, requestOptionsObj);
      console.log(response);

      // if (response.data.message === "user created") {
      //     setIsLoading(false);
      //     setSuccessMessage(response.data.message);
      // } else {
      //     setIsLoading(false);
      //     dispatch({
      //         type: "LOGIN",
      //         user: {
      //             email: response.data.player.email,
      //             username: response.data.player.username,
      //         },
      //     });
      // }
    } catch (e) {
      console.log(e);
      setError(...something);
      setIsLoading(true);
    }
  }

  useEffect(() => {
    if (!isLoading) {
      return;
    } //this prevents api call on initial mount

    handleAPIFetchCall();
  }, [isLoading, url, options, baseURL]); //baseURL currently static value.

  return [
    { isLoading, response, error, setError, setSuccessMessageValue },
    handleAPICallSubmit,
    successMessageValue,
  ];
}

export default useFetchApi;
