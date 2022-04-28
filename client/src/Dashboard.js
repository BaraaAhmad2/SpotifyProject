import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import ReactDOM from "react-dom";
import update from "react-addons-update";
import {NavLink, tbody, table} from  'react-bootstrap';
import hcbgImage from "./images/header-background.jpg";
import bodyImage from "./images/body.jpg";

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
    if(count <10){
    count++;
    ze = count;
    
    othercounter = count;
    }
    else{
      combined = " "

      setTopArtist([
        ...topArtist,
        {
          pCode: combined,
          pName: combined,
          pLink: combined,
        },
      ]);
    }
    
  };

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  return (
 <div className="App"> 

      <div className="modal-header justify-content-center" style={{backgroundImage: 'url('+hcbgImage+')', backgroundRepeat: "no-repeat", backgroundSize: "100% 90%", backgroundColor: "black",}}>
        <h1 style={{ color: "white" , fontSize: 100}}>Swapify </h1>
      </div>
      <div style={{backgroundColor: "black"}}>
            <br/>
            <br/>
      </div>

      <div style={{display: "flex", alignItems: "center",justifyContent: "center" ,backgroundImage: 'url('+bodyImage+')', backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", height:800}}>
        <div class="container" >

          <div class = "row" style={{color:"white"}}> 
            <div className="d-flex justify-content-center align-items-center">
              Step 1: Press the 'Generate Playlist' button five times.
            </div>
          </div>

          <div class = "row">
            <br/>
          </div>

          <div class = "row"> 
            <div className="d-flex justify-content-center align-items-center">
              <a className="btn btn-success" onClick={display}>
                Generate Playlist
              </a>
            </div>
          </div>

          <div class = "row">
            <br/>
          </div>

          <div class = "row" style={{color:"white"}}> 
            <div className="d-flex justify-content-center align-items-center">
              Step 2: Press the 'Reveal Playlist' button five times to show songs.
            </div>
          </div>

          <div class = "row">
            <br/>
          </div>

          <div class = "row">
            <div className="d-flex justify-content-center align-items-center">
              <a className="btn btn-success" onClick={addItemHandler}>
                Reveal Playlist
              </a>
            </div>
          </div>

          <div class = "row">
            <br/>
            <br/>
            <br/>
            <br/>
          </div>

          <div class = "row">
          
            <div className="d-flex justify-content-center align-items-center">
              <table className = "table table-striped" style={{backgroundColor: "black", border: "4px solid forestgreen", width: 500}}>
              <th scope="row" style={{color: 'white', fontSize: 20, alignItems: "left"}}>Suggested Songs</th>
                {topArtist.map((pObj) => (
                  <tr key={pObj.pCode}>
                    <td> 
                    <a style={{color: 'white', fontSize: 16}} href={pObj.pLink}>
                      {pObj.pName}
                    </a>
                    </td> 
                  </tr>
                ))}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
