import React, { useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store'
/* import '../css/App.scss'; */

import Navbar from './Navbar';
import SearchBar from './SearchBar'
import Wordlist from './Wordlist'
import ShowView from './ShowView'
import Worddetail from './Worddetail'
/* NOTE 重构样式，先不显示用户头像组件 */
let wordSet = [
  {newIndex:1, ifCollected:false,english: 'abandon', pronunciation: '/ ə’bændən/', speech: 'vt', chinese: '丢弃' },
  {newIndex:2, ifCollected:false,english: 'aboard', pronunciation: '/ ə’bɔ:d/', speech: 'ad', chinese: '上船' },
  {newIndex:3, ifCollected:false,english: 'absolute', pronunciation: '/ ‘æbsəlu:t/', speech: 'a', chinese: '绝对的' },
  {newIndex:4, ifCollected:false,english: 'absolutely', pronunciation: '/ ‘æbsəlu:tli/', speech: 'ad', chinese: '完全地' },
  {newIndex:5, ifCollected:false,english: 'absorb', pronunciation: '/ əb’sɔ:b/', speech: 'vt', chinese: '吸收' },
  {newIndex:6, ifCollected:false,english: 'abstract', pronunciation: '/ ’æbstrækt/', speech: 'n', chinese: '摘要' },
  {newIndex:7, ifCollected:false,english: 'abundant', pronunciation: '/ ə’bΛndənt/', speech: 'a', chinese: '丰富的' },
  {newIndex:8, ifCollected:false,english: 'abuse', pronunciation: '/ ə’bju:z/', speech: 'vt', chinese: '滥用' },
  {newIndex:9, ifCollected:false,english: 'academic', pronunciation: '/ ækə’demik/', speech: 'a', chinese: '学院的' },
  {newIndex:10,ifCollected:false, english: 'accelerate', pronunciation: '/ æk’seləreit/', speech: 'vt', chinese: '促进' },
  {newIndex:11,ifCollected:false, english: 'access', pronunciation: '/ ‘ækses/', speech: 'n', chinese: '入口' },
  {newIndex:12,ifCollected:false, english: 'accidental', pronunciation: '/ æksi’dentl/', speech: 'a', chinese: '偶然的' },
  {newIndex:13,ifCollected:false, english: 'accommodate', pronunciation: '/ ə’kɔmədeit/', speech: 'vt', chinese: '容纳' },
  {newIndex:14,ifCollected:false, english: 'accommodation', pronunciation: '/ ə,kɔmə’deiʃən/', speech: 'n', chinese: '招待设备' },
  {newIndex:15,ifCollected:false, english: 'accompany', pronunciation: '/ ə’kΛmpəni/', speech: 'vt', chinese: '伴随' },
  {newIndex:16,ifCollected:false, english: 'accomplish', pronunciation: '/ ə’kɔmpliʃ/', speech: 'vt', chinese: '达到' },
  {newIndex:17,ifCollected:false, english: 'accordance', pronunciation: '/ ə’kɔr:dəns/', speech: 'n', chinese: '一致' },
  {newIndex:18,ifCollected:false, english: 'accordingly', pronunciation: '/ ə’kɔr:diŋli/', speech: 'ad', chinese: '所以' },
  {newIndex:19,ifCollected:false, english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  {newIndex:20,ifCollected:false, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  /*  */
  {newIndex:21,ifCollected:false, english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  {newIndex:22,ifCollected:false, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  {newIndex:23,ifCollected:false, english: 'account', pronunciation: '/ ə’kaunt/', speech: 'n', chinese: '记述' },
  {newIndex:24,ifCollected:false, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' },
  {newIndex:25,ifCollected:false, english: 'accumulate', pronunciation: '/ ə’kju:mjuleit/', speech: 'vt', chinese: '积累' }
];
function App() {
  const [searchDisplay, setsearchDisplay] = useState(false)
  const [wordNum, setwordNum] = useState(20)
  const [wordContent, setwordContent] = useState('this is word content')
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar></Navbar>        
        <SearchBar></SearchBar>
        <Wordlist data={wordSet}></Wordlist>
        <Worddetail></Worddetail>
        <ShowView></ShowView>
      </div>
    </Provider>
  );
}

export default App;
