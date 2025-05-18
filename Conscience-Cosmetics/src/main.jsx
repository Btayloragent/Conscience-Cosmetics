import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/landingPage.jsx'
import MakeUpPage from './pages/makeUpPage.jsx'
import VideoPage from './pages/VideoPage.jsx'
import CosmeticPage from './pages/CosmeticPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import FavsPage from './pages/FavsPage.jsx'
import VideoTube from './pages/VideoTube.jsx'; // you'll create this
import ProfilePage from './pages/ProfilePage.jsx';


let router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />
  },
  {
    path: "/MakeUpPage",
    element: <MakeUpPage />
  },
  {
    path: "/VideoPage",
    element: <VideoPage />
  },
  {
    path: "/CosmeticPage",
    element: <CosmeticPage />
  },
  {
    path: "/UploadPage",
    element: <UploadPage />
  },
  {
    path: "/FavsPage",
    element: <FavsPage />
  },
  {
    path: "/VideoPage",
    element: <VideoPage />
  },
  {
    path: "/VideoPage/:videoId", // 👈 Add this route
    element: <VideoTube />
  },
 {
  path: "/profile/:userId",
  element: <ProfilePage />
}



]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)