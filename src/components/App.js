import React,{ useState } from 'react';
import '../css/App.scss';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import ShowView from './ShowView'
function App() {
  const [searchDisplay, setsearchDisplay] = useState(false)
  return (
    <div className="App">
      <Navbar></Navbar>
      <SearchBar ifSearchbarDisplay={searchDisplay}></SearchBar>
      <ShowView></ShowView>
    </div>
  );
}

export default App;
