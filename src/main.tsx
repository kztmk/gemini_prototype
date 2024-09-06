import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import store from './store';
import TextGenerator from './textGenerator.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <TextGenerator />
    </Provider>
  </StrictMode>
);