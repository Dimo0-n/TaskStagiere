import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { FormattingProvider } from './context/FormattingContext.jsx';
import './styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FormattingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FormattingProvider>
  </StrictMode>,
);
