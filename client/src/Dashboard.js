import React, { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
import { useState } from "react";

import {Container, Form} from 'react-bootstrap'
var spotifyApi = new SpotifyWebApi();
export default function Dashboard({ code }) {
   //const accessToken = useAuth(code);
  
//need to authorize bearer for these two
console.log("we have reached this point");


  console.log(spotifyApi.setAccessToken({code})); //prints undefined
  console.log(code);   //code prints out successfully


 const[search ,setSearch]=useState("");
 useEffect(()=> {
   console.log("we entered the useEffect")
   if(!code) return
   spotifyApi.setAccessToken({code})
   if(spotifyApi.setAccessToken(code) == null) console.log("code is null")
 },[code])

  // spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
  // .then(function(code) {
  //   console.log('Album information', code.body);
  // }, function(err) {
  //   console.error(err);
  // });


  // spotifyApi.getMyTopTracks()
  // .then(function(data) {
  //   let topTracks = data.body.items;
  //   console.log(topTracks);
  // }, function(err) {
  //   console.log('Something went wrong!', err);
  // });

 return <div>{code}</div>;
}
