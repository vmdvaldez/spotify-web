import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {createBrowserRouter,RouterProvider, Navigate} from "react-router-dom";

import App from './App.jsx'
import TopArtists from './components/TopArtists.jsx';
import TopSongs from './components/TopSongs.jsx';
import RecentlyPlayed from './components/RecentlyPlayed.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children:[
      {
        index: true, element: <Navigate to="/topartists" replace/>
      },
      {
        path: "topartists",
        element: <TopArtists/>
      },
      {
        path: "topsongs",
        element: <TopSongs/>
      },
      {
        path: "recentlyplayed",
        element: <RecentlyPlayed/>
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}></RouterProvider>
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
)
