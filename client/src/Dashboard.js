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
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
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
            
            console.log("Song: ", data.body.tracks.at(getRandomInt(4)).name.toString());
          },
          function (err) {  
            console.log("Something went wrong!", err);
          }
        );
    }
    spotifyApi.getMyTopArtists({ limit: 5 }).then(
      function (data) {
       
        for(var i =0; i < 5; ++i){
          topBand[i] = data.body.items.at(i).id.toString();
          console.log("Your top artists: ", topBand[i]);
          topTracks(topBand[i]);
        }
        // topBand = data.body.items.at(4).id.toString(); 
          
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    // console.log("top band", topBand);
    // console.log("Top 5 Artists", data.body);

    // spotifyApi.getMyTopTracks({ limit: 5 }).then(
    //   function (data) {
    //     let topTracks = data.body.items;
    //     console.log("Top 5 songs", topTracks);
    //   },
    //   function (err) {
    //     console.log("Something went wrong!", err);
    //   }
    // );
  }

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <div className="border d-flex align-items-center justify-content-center">
        <Button className="justify-content-center" onClick={display}>
          Send Request
        </Button>
      </div>
    </Container>
  );
}
