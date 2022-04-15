import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import { useState } from "react";

import { Button, Container, Form } from 'react-bootstrap'
import axios from "axios";

var spotifyApi = new SpotifyWebApi();
const REDIRECT_URI = "http://localhost:3000/";
const CLIENT_ID = "961e293d6bfc41c0b753d647bf1dcb08";
const CLIENT_SECRET = "b1012699910f438d8d80129075f37580";

export default function Dashboard({ code }) {
  //const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [accessToken, setAccessToken] = useState("");
  
  useEffect(() => {
    if (!code) return

    axios.post('http://localhost:3001/login', {code:code})
      .then((response) => {
        console.log(response)
      })
      .catch(e=>console.log(e))
  }, [code])


  // spotifyApi.getMyTopTracks()
  // .then(function(data) {
  //   let topTracks = data.body.items;
  //   console.log(topTracks);
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  // });

  function handleButtonClick() {
  
  }

  return (
    <div>
      {code}
      <Button onClick={handleButtonClick}>
        Send Request
      </Button>
    </div>
  )
}
