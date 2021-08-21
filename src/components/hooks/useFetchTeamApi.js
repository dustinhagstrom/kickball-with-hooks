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
  const [response, setResponse] = useState(null);
  const [successMessageValue, setSuccessMessageValue] = useState(null);

  //can do a success toast if I want to.
  const { dispatch } = useContext(AuthContext);

  function handleAPICallSubmit(callOptions = {}) {
    //options = {} is a default parameter that states if an options is not passed then the default value is empty obj
    setCallOptions(callOptions);
    setIsLoading(true);
  }

  async function handleAPIFetchCall() {
    const requestOptionsObj = {
      ...callOptions, //this is signup or login data
      withCredentials: true, //this is a boolean that says we should allow credentials cross-site. this is ignored if the req origin is same as res origin.
      credentials: "include", //this allows sending cookies cross-origin. "Request.credentials"
      ...{
        headers: {
          authorization: null, //not required b/c no cookie yet
        },
      },
    };

    try {
      let response = await axios(baseURL + url, requestOptionsObj);
      console.log(response.data.message);

      if (response.data.message === "user created") {
        setIsLoading(false);
        setSuccessMessageValue(response.data.message);
        setResponse(response.data.message);
      } else {
        setIsLoading(false);
        dispatch({
          type: "LOGIN",
          user: {
            email: response.data.player.email,
            username: response.data.player.username,
            isTeamCaptain: response.data.player.isTeamCaptain,
            isOnATeam: response.data.player.isOnATeam,
          },
        });
      }
    } catch (e) {
      console.log(e);
      setError(e);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoading) {
      return;
    } //this prevents api call on initial mount

    handleAPIFetchCall();
  }, [isLoading, url, callOptions, baseURL]); //baseURL currently static value.

  return [
    {
      isLoading,
      error,
      setError,
      response,
      setResponse,
      setSuccessMessageValue,
    },
    handleAPICallSubmit,
    successMessageValue,
  ];
}

export default useFetchApi;
