import React from "react";
import { Col, Container } from "react-bootstrap";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.production.min";
import useAuth from "./useAuth";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=961e293d6bfc41c0b753d647bf1dcb08&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

export default function Login({ code }) {
  // const accessToken = useAuth(code);

  function authorize() {
    var body = {
      scopes:
        "user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state",
    };
    fetch("http://localhost:3001/authorize", {
      method: "POST",
      body: JSON.stringify(body),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
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
