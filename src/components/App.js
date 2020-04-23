import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'
/* import '../css/App.scss'; */

import Navbar from './Navbar';
import SearchBar from './SearchBar'
import Wordlist from './Wordlist'
import ShowView from './ShowView'
/* NOTE 重构样式，先不显示用户头像组件 */
function App() {
  const [searchDisplay, setsearchDisplay] = useState(false)
  const [wordNum, setwordNum] = useState(20)
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar></Navbar>        
        <SearchBar></SearchBar>
        <Wordlist wordNum={wordNum}></Wordlist>
        <ShowView></ShowView>
      </div>
    </Provider>
  );
}

export default App;
