import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import {InitialView, LikesView, PubsView, NewPubView, ChatView, VendedorChatView} from "./components";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// export let viewChange = false;
// export const updateViewChange = () => {
//     viewChange = !viewChange;
//     console.log("viewChange: ", viewChange);
// }

root.render(
  <React.StrictMode>
      <BrowserRouter>
          <Routes>
              <Route path= "/" element={<App />} />
              <Route path= "/home" element={<InitialView />} />
              <Route path="/home/likes" element={<LikesView />} />
              <Route path="/home/pubs" element={<PubsView />} />
              <Route path="/home/pubs/new" element={<NewPubView />} />
              <Route path="/home/vehicle" element={<InitialView />} />
              <Route path="/home/chats" element={<ChatView />} />
              <Route path="/home/chats/vendedor" element={<VendedorChatView />} />
              <Route path="/profile" element={<InitialView />} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
