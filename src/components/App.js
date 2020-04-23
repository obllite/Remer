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
  {newIndex:1, english: 'abandon', pronunciation: '/ ə’bændən/', speech: 'vt', chinese: '丢弃' },
  {newIndex:2, english: 'aboard', pronunciation: '/ ə’bɔ:d/', speech: 'ad', chinese: '上船' },
  {newIndex:3, english: 'absolute', pronunciation: '/ ‘æbsəlu:t/', speech: 'a', chinese: '绝对的' },
  {newIndex:4, english: 'absolutely', pronunciation: '/ ‘æbsəlu:tli/', speech: 'ad', chinese: '完全地' },
  {newIndex:5, english: 'absorb', pronunciation: '/ əb’sɔ:b/', speech: 'vt', chinese: '吸收' },
  {newIndex:6, english: 'abstract', pronunciation: '/ ’æbstrækt/', speech: 'n', chinese: '摘要' },
  {newIndex:7, english: 'abundant', pronunciation: '/ ə’bΛndənt/', speech: 'a', chinese: '丰富的' },
  {newIndex:8, english: 'abuse', pronunciation: '/ ə’bju:z/', speech: 'vt', chinese: '滥用' },
  {newIndex:9, english: 'academic', pronunciation: '/ ækə’demik/', speech: 'a', chinese: '学院的' },
  {newIndex:10, english: 'accelerate', pronunciation: '/ æk’seləreit/', speech: 'vt', chinese: '促进' },
  {newIndex:11, english: 'access', pronunciation: '/ ‘ækses/', speech: 'n', chinese: '入口' },
  {newIndex:12, english: 'accidental', pronunciation: '/ æksi’dentl/', speech: 'a', chinese: '偶然的' },
  {newIndex:13, english: 'accommodate', pronunciation: '/ ə’kɔmədeit/', speech: 'vt', chinese: '容纳' },
  {newIndex:14, english: 'accommodation', pronunciation: '/ ə,kɔmə’deiʃən/', speech: 'n', chinese: '招待设备' },
  {newIndex:15, english: 'accompany', pronunciation: '/ ə’kΛmpəni/', speech: 'vt', chinese: '伴随' },
  {newIndex:16, english: 'accomplish', pronunciation: '/ ə’kɔmpliʃ/', speech: 'vt', chinese: '达到' },
  {newIndex:17, english: 'accordance', pronunciation: '/ ə’kɔr:dəns/', speech: 'n', chinese: '一致' },
  {newIndex:18, english: 'accordingly', pronunciation: '/ ə’kɔr:diŋli/', speech: 'ad', chinese: '所以' },
  {newIndex:19, english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  {newIndex:20, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  /*  */
  {newIndex:21, english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  {newIndex:22, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  {newIndex:23, english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  {newIndex:24, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  {newIndex:25, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' }
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
