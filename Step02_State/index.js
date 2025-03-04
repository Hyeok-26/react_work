import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App4';  // App.js 를 import 해서 App 라는 이름으로 사용하기기
import reportWebVitals from './reportWebVitals';

// id 가 root 인 div 안에에 App.js  에서 리턴해준 component 로 채우기
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
