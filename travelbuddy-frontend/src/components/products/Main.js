import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
    fetch('http://localhost:8080/schedule/hello')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>{message}</h1>
      날짜<input/><input/>
      <br/>
      여행장소
      <select name="selectedFruit">
        <option value="apple">제주도</option>
        <option value="banana">대전</option>
        <option value="orange">부산</option>
      </select>
      <br/>
      숙소
      <select name="selectedFruit">
        <option value="orange">아파트</option>
        <option value="banana">빌라</option>
        <option value="apple">호텔/모텔</option>
      </select>
      <br/>
      질문 : 새로운 모임의 단톡방이 만들어 졌을 때 나는?
      <br/>
      <button>인사만 하고 별다른 톡은 남기지 않는다.</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button>완전 소꿉친구 바이브 나온다</button>
      <br/>
      <button>어색한 분위기를 살리려고 인사하고, 리액션이나 이모티콘을 사용해본다.</button>
      <button>우우 유령이다 우우</button>
      <br/>
      <button>일정생성</button>
    </div>
  );
}

export default App;
