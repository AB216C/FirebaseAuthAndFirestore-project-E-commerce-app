

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Redux Store
import { store } from './app/store';
import { Provider } from 'react-redux';

// React Query Client
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Router
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);