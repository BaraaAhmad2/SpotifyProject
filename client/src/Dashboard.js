import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import ReactDOM from "react-dom";
import update from "react-addons-update";

const spotifyApi = new SpotifyWebApi({
  clientId: "961e293d6bfc41c0b753d647bf1dcb08",
});

let topBand = [];
let songURL = [];
let artistName = [];
let topSong = [];
var count = 0;
var tracker = 0;
var tracker2 = 0;
var ze = 0;
var othercounter = 0;

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);

  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  const [topArtist, setTopArtist] = useState([{ pCode: "", pName: "" }]);

  const [topSongs, setTopSongs] = useState([]);

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

    function topTracks(artistID) {
      const iRand = getRandomInt(9);
      spotifyApi.getArtistTopTracks(artistID, "GB").then(
        function (data) {
          //console.log(data.body.tracks.at(0).external_urls);
          if (tracker < 10) {
            topSong[tracker] = data.body.tracks.at(iRand).name;
            songURL[tracker] = data.body.tracks.at(iRand).external_urls.spotify;

            console.log("Song: ", topSong[tracker]);
            console.log(songURL[tracker]);

            tracker++;
          }
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    }

    spotifyApi.getMyTopArtists({ limit: 10 }).then(
      function (data) {
        

        for(var i=0; i< 10; ++i){
          
      
          topBand[i] = data.body.items.at(i).id.toString();
          topTracks(topBand[i]);
          artistName[i] = data.body.items.at(i).name.toString();
          continue;
      }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }

  const addItemHandler = () => {
    let iRand =getRandomInt;
    let combined = artistName[count] + "- " + topSong[ze];
    let link = songURL[othercounter];

    setTopArtist([
      ...topArtist,
      {
        pCode: topArtist.length,
        pName: combined,
        pLink: link,
      },
    ]);
    ze++;
    count++;
    othercounter++;
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      <Button className="justify-content-center" onClick={display}>
        Send Request
      </Button>
      <div className="item-container">
        <h3>Bands</h3>
        <button onClick={addItemHandler}>Add Band</button>
        <ul>
          {topArtist.map((pObj) => (
            <li key={pObj.pCode}>
              <a href={pObj.pLink}>{pObj.pName}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
