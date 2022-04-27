import React from "react";
import { Col, Container } from "react-bootstrap";
import { useState } from "react/cjs/react.development";
import { useEffect } from "react/cjs/react.production.min";
import useAuth from "./useAuth";
import { Button} from  'react-bootstrap';
import hcbgImage from "./images/header-background.jpg";
import bodyImage from "./images/body.jpg";
import logoImage from "./images/logo.png";

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=961e293d6bfc41c0b753d647bf1dcb08&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20user-top-read";

export default function Login() {
  return (
     <div className="App">   
        <div className="modal-header justify-content-center" style={{backgroundImage: 'url('+hcbgImage+')', backgroundRepeat: "no-repeat", backgroundSize: "100% 90%", backgroundColor: "black",}}>
          <h1 style={{ color: "white" , fontSize: 100}}>Swapify </h1>
        </div>
        
        <div style={{display: "flex", alignItems: "center",justifyContent: "center" ,backgroundImage: 'url('+bodyImage+')', backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", height:600}}>
          <div class="container">

            <div class="row" style={{display: "flex", alignItems: "center",justifyContent: "center"}}> 
              <img src={logoImage} style={{width: 300, height: 250}}/>
            </div>

            <div class = "row">
              <br/>
              <br/>
            </div>

            <div class = "row" style={{color:"white", display: "flex", alignItems: "center",justifyContent: "center", fontSize: 25 }}>
              Welcome to Swapify!
            </div>

            <div class = "row">
              <br/>
            </div>

            <div class="row">
              <div className="d-flex justify-content-center align-items-center">
                <a className="btn btn-success" href={AUTH_URL}>
                  Login
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
  );
}
