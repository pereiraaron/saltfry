import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

if (import.meta.env.PROD) {
  import('clarity-js').then(({ clarity }) => {
    clarity.start({
      projectId: 'vthwcc5cqw',
      upload: 'https://m.clarity.ms/collect',
      track: true,
      content: true,
    });
  });
}

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
