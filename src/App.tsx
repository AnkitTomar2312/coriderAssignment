import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HomeLayout from "./layouts/HomeLayout";
import Chat from "./components/Chat";

function App() {
  return (
    <div>
      <HomeLayout>
        <Chat />
      </HomeLayout>
    </div>
  );
}

export default App;
