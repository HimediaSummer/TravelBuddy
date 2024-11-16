import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './Store.js'; // Store 파일 import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* Provider로 App을 감쌉니다 */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
