import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import setupMock from './mock';

const rootEl = document.getElementById('root');
setupMock();
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
