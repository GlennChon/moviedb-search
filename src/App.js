import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getSearchResults } from "./services/moviedbService";
function App() {
  useEffect(() => {
    const test = async () => {
      const result = await getSearchResults("jack reacher");
      console.log(result);
    };
    test();
  }, []);
  return (
    <div className="App">
      <div>Search Bar</div>
      <div>
        Body
        <div>Results</div>
      </div>
    </div>
  );
}

export default App;
