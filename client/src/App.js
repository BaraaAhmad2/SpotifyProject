import React from "react";
import Login from "./Login";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";

const code = new URLSearchParams(window.location.search).get("code");
window.history.pushState({}, null, "/");
window.localStorage.setItem("token", code);
//if you have an access code, go to dashboard. otherwise, login
function App() {
  return code ? <Dashboard code={code} /> : <Login />;
}

export default App;
