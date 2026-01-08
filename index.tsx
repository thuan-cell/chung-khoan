
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const mountNode = document.getElementById('root');

if (!mountNode) {
  console.error("Hệ thống không tìm thấy phần tử #root để khởi chạy ứng dụng.");
} else {
  const root = ReactDOM.createRoot(mountNode);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
