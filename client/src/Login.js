import React from "react";
import { Col, Container } from "react-bootstrap";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.production.min";
import useAuth from "./useAuth";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=52c66e4315d64fad9d30fc06a14e7ff1&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read";

export default function Login({ code }) {


  function authorize() {
    var body = {
      scopes:
        "user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-top-read user-modify-playback-state",
    };
    fetch("http://localhost:3001/authorize", {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer" + {code},
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login With Spotify
      </a>
    </Container>
  );
}
