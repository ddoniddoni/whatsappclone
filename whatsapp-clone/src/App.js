import React from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

const App = () => {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default App;
