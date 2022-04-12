const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const SpotifyWebApi = require("spotify-web-api-node");
const querystring = require("querystring");
const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET } = require("./constants");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/login", (req, res) => {
  const code = req.body.code;
  const spotifyApi = new SpotifyWebApi({
    redirectUri: REDIRECT_URI,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  });
  spotifyApi
    .authorizationCodeGrant(req.body.code)
    .then((data) => {
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expiresIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(3001, () => {
  console.log("running on port 3001");
});
