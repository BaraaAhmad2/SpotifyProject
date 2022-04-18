import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import Player from "./Player";
import TrackSearchResult from "./TrackSearchResult";
import { Container, Form } from "react-bootstrap";
import SpotifyWebApi from "spotify-web-api-node";
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { MDBBtn } from "mdb-react-ui-kit";

const spotifyApi = new SpotifyWebApi({
  clientId: "961e293d6bfc41c0b753d647bf1dcb08",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("");
  var topBand;
  function display() {
    spotifyApi.getMe().then(
      function (data) {
        console.log("Some information about the authenticated user", data.body);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    spotifyApi.getMyTopArtists({ limit: 5 }).then(
      function (data) {
        topBand = data.body.items.at(2).id.toString();

        spotifyApi.getArtistTopTracks(topBand, "GB").then(
          function (data) {
            for (var i = 5; i < 10; ++i) {
              console.log(data.body.tracks.at(i).name);
            }
          },
          function (err) {
            console.log(topBand);
            console.log("Something went wrong!", err);
          }
        );
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );

    // console.log("top band", topBand);
    // console.log("Top 5 Artists", data.body);

    spotifyApi.getMyTopTracks({ limit: 5 }).then(
      function (data) {
        let topTracks = data.body.items;
        console.log("Top 5 songs", topTracks);
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
    <Container className="d-flex flex-column py-2" style={{ height: "100vh" }}>
      <div className="border d-flex align-items-center justify-content-center">
        <Button color="success" onClick={display}>
          Send Request
        </Button>
      </div>
    </Container>
  );
}
