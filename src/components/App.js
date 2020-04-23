import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'
/* import '../css/App.scss'; */

import Navbar from './Navbar';
import SearchBar from './SearchBar'
import Wordlist from './Wordlist'
import ShowView from './ShowView'
/* NOTE 重构样式，先不显示用户头像组件 */
let wordSet = [
  { english: 'abandon', pronunciation: '/ ə’bændən/', speech: 'vt', chinese: '丢弃' },
  { english: 'aboard', pronunciation: '/ ə’bɔ:d/', speech: 'ad', chinese: '上船' },
  { english: 'absolute', pronunciation: '/ ‘æbsəlu:t/', speech: 'a', chinese: '绝对的' },
  { english: 'absolutely', pronunciation: '/ ‘æbsəlu:tli/', speech: 'ad', chinese: '完全地' },
  { english: 'absorb', pronunciation: '/ əb’sɔ:b/', speech: 'vt', chinese: '吸收' },
  { english: 'abstract', pronunciation: '/ ’æbstrækt/', speech: 'n', chinese: '摘要' },
  { english: 'abundant', pronunciation: '/ ə’bΛndənt/', speech: 'a', chinese: '丰富的' },
  { english: 'abuse', pronunciation: '/ ə’bju:z/', speech: 'vt', chinese: '滥用' },
  { english: 'academic', pronunciation: '/ ækə’demik/', speech: 'a', chinese: '学院的' },
  { english: 'accelerate', pronunciation: '/ æk’seləreit/', speech: 'vt', chinese: '促进' },
  { english: 'access', pronunciation: '/ ‘ækses/', speech: 'n', chinese: '入口' },
  { english: 'accidental', pronunciation: '/ æksi’dentl/', speech: 'a', chinese: '偶然的' },
  { english: 'accommodate', pronunciation: '/ ə’kɔmədeit/', speech: 'vt', chinese: '容纳' },
  { english: 'accommodation', pronunciation: '/ ə,kɔmə’deiʃən/', speech: 'n', chinese: '招待设备' },
  { english: 'accompany', pronunciation: '/ ə’kΛmpəni/', speech: 'vt', chinese: '伴随' },
  { english: 'accomplish', pronunciation: '/ ə’kɔmpliʃ/', speech: 'vt', chinese: '达到' },
  { english: 'accordance', pronunciation: '/ ə’kɔr:dəns/', speech: 'n', chinese: '一致' },
  { english: 'accordingly', pronunciation: '/ ə’kɔr:diŋli/', speech: 'ad', chinese: '所以' },
  { english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  { english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  /*  */
  { english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  { english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  { english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  { english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  { english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' }
];
function App() {
  const [searchDisplay, setsearchDisplay] = useState(false)
  const [wordNum, setwordNum] = useState(20)
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar></Navbar>        
        <SearchBar></SearchBar>
        <Wordlist data={wordSet}></Wordlist>
        <ShowView></ShowView>
      </div>
    </Provider>
  );
}

export default App;
