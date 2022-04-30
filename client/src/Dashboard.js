import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
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
var ze = 0;
var othercounter = 0;

export default function Dashboard({ code }) {
  //use code given from authorization to obtain access token
  const accessToken = useAuth(code);

  //define hooks
  const [topArtist, setTopArtist] = useState([{ pCode: "", pName: "" }]);

  //genereate random number to cycle through random order of songs
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //display personal account stuff
  function display() {
    spotifyApi.getMe().then(
      function (data) {
        console.log("Name: ", data.body.display_name);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    //given an artist ID, get their top tracks (url and name)
    function topTracks(artistID) {
      const iRand = getRandomInt(9);
      spotifyApi.getArtistTopTracks(artistID, "GB").then(
        function (data) {
          if (tracker < 10) {
            //randomize the order of which the artists are shown
            //use the same constant randomly generated number to display the correct link
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

    //get a user's top artists, limit to 10
    spotifyApi.getMyTopArtists({ limit: 10 }).then(
      function (data) {
        

        for(var i=0; i< 10; ++i){
          
      
          //data.body is using the spotify api

          //with each index, add an artist ID
          topBand[i] = data.body.items.at(i).id.toString();
          //given the ID at the specific index, use that information to call the topTracks function
          topTracks(topBand[i]);
          //save the artist name as a string
          artistName[i] = data.body.items.at(i).name.toString();
          console.log(artistName[i])
          continue;
      }
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  }

  //function to map the data and displaying it on the page
  const addItemHandler = () => {
    let combined = artistName[count] + "- " + topSong[ze];
    let link = songURL[othercounter];

    //necessary information to display (in JSON format)
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

  //if you have an access token, go back to the previous page. otherwise, set a new acccess token
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
