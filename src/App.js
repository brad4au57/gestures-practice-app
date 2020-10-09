import React from "react";
import DraggableList from "./components/DraggableItems";
import "./App.css";

function App() {
  return <DraggableList items={"Zero One Two Three Four".split(" ")} />;
}

export default App;
