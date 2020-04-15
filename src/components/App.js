import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'
import '../css/App.scss';
import Navbar from './Navbar';
import SearchBar from './SearchBar'
import ShowView from './ShowView'

function App() {
  const [searchDisplay, setsearchDisplay] = useState(false)
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar></Navbar>
        <SearchBar></SearchBar>
        <ShowView></ShowView>
      </div>
    </Provider>
  );
}

export default App;
