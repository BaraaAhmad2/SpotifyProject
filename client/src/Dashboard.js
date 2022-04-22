import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import ReactDOM from "react-dom";


const spotifyApi = new SpotifyWebApi({
  clientId: "52c66e4315d64fad9d30fc06a14e7ff1",
});

let topBand = [];
  let topSong = [];
  var count = 5;

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");

  // let topBand = [];
  // let topSong = [];

  const [topArtist, setTopArtist] = useState([
    {pCode:1,pName:topBand[5]},
    // {pCode:2,pName:topBand[6]},
    // {pCode:3,pName:topBand[7]},
    // {pCode:4,pName:topBand[8]},
    // {pCode:5,pName:topBand[9]},
  ]);


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
          //setTopArtist(data.body.items);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    
  }

  const addItemHandler=()=> {
    
    setTopArtist([...topArtist, {
   
      pCode: topArtist.length,
      pName: topBand[count]
    }])

    count++;
    
    // let nObj = {pCode:count+6,pName:topSong[count]}
    // count++;
    // let arr = topArtist.filter(nObj);
    // setTopArtist(arr);
    
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
        <h3>Bands</h3>
        <ul>{
        topArtist.map(pObj=>(
          <li key={pObj.pCode}>{pObj.pName}</li>
        )
        )}
        </ul>
        <button onClick={addItemHandler}>Add Band</button>
      </div>
   </div> 
  );
}
  

