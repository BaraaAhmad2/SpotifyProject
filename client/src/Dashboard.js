import React from "react";
import SpotifyWebApi from "spotify-web-api-node";
import useAuth from "./useAuth";
var spotifyApi = new SpotifyWebApi();

export default function Dashboard({ code }) {
  // const accessToken = useAuth(code);
  
//need to authorize bearer for these two
  spotifyApi.setAccessToken({code});
  
  spotifyApi.getAlbum('5U4W9E5WsYb2jUQWePT8Xm')
  .then(function(data) {
    console.log('Album information', data.body);
  }, function(err) {
    console.error(err);
  });


  spotifyApi.getMyTopTracks()
  .then(function(data) {
    let topTracks = data.body.items;
    console.log(topTracks);
  }, function(err) {
    console.log('Something went wrong!', err);
  });

 return <div>{code}</div>;
}
