import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import BookStore from './store/BookStore';
import OrderStore from './store/OrderStore';


export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    user: new UserStore(),
    book: new BookStore(),
    order: new OrderStore()
  }}>
  <React.StrictMode>  
    <App />
  </React.StrictMode>
  </Context.Provider>
);

reportWebVitals();
