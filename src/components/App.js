import React from 'react';
import '../css/App.scss';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import ShowView from './ShowView'
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <ShowView></ShowView>
    </div>
  );
}

export default App;
