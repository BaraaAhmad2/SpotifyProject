import { useState, useEffect } from "react";
import axios from "axios";

export default function useAuth(code) {

  //define hooks
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();


  //sending post request to retrieve necessary tokens
  useEffect(() => {
    console.log(code);
    const config = { headers: { "Content-Type": "application/json" } };

    const data = {
      accesscode: code,
    };
    console.log(data);

    axios
      .post("http://localhost:3001/login", {
        code,
      })
      .then((res) => {
        console.log("HELLO");
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        window.history.pushState({}, null, "/");  //clean up URL
      })
      .catch(() => {
        window.location = "/";
      });
  }, [code]);

  //set useEffect to make the refresh token last longer
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch(() => {
          window.location = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
