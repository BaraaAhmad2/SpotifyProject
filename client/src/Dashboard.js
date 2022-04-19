import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Button, Card } from "react-bootstrap";

const spotifyApi = new SpotifyWebApi({
  clientId: "961e293d6bfc41c0b753d647bf1dcb08",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const [topArtist, setTopArtist] = useState([]);
  const [topSongs, setTopSongs] = useState([]);


  let topBand = [];
  let topSong = [];



  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }


  function display() {
    spotifyApi.getMe().then(
      function (data) {
        console.log("Name: ", data.body.display_name);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    function topTracks(artistID){
      spotifyApi.getArtistTopTracks(artistID, "GB").then(
          function (data) {
            
            
            for(var i =0; i < 5; ++ i){
              topSong[i] = data.body.tracks.at(getRandomInt(9)).name
              
              console.log("Song: ", topSong[i]);
              break;
            }
          },
          function (err) {  
            console.log("Something went wrong!", err);
          }
        );
    }
    spotifyApi.getMyTopArtists({ limit: 10 }).then(
      function (data) {
       
        for(var i =5; i < 10; ++i){
          topBand[i] = data.body.items.at(i).id.toString();
          console.log("Your top artists: ", topBand[i]);
          topTracks(topBand[i]);
        }
          setTopArtist(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    
    <div>
        <Button className="justify-content-center" onClick={display}>
          Send Request
        </Button>
        <div className='item-container'>
        <div>
         
          </div>
      </div>
   </div>
  );
}
