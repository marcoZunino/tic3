import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {InitialView, LikesView, PubsView} from "./components";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path= "/" element={<App />} />
              <Route path= "/home" element={<InitialView />} />
              <Route path="/home/likes" element={<LikesView />} />
              <Route path="/home/pubs" element={<PubsView />} />
              <Route path="/home/pubs/new" element={<InitialView />} />
              <Route path="/home/vehicle" element={<InitialView />} />
              <Route path="/home/chats" element={<InitialView />} />
              <Route path="/profile" element={<InitialView />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
