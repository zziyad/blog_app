import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { Provider } from 'react-redux';
import store from './store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>
  // </React.StrictMode>
);

