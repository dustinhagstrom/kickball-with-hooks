import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { AuthContext } from "../../context/AuthContext";

function useFetchApi(url) {

    const baseURL = process.env.NODE_ENV //react already has this node env variable established.
    === "development"
    ? "http://localhost:8080/api"
    : "DEPLOYED LOCATION";

    const [isLoading, setIsLoading]

    
    return (
        <div>
            
        </div>
    )
}

export default useFetchApi
