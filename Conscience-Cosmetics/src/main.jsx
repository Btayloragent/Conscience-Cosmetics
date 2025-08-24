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
import VideoTube from './pages/VideoTube.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import ProfileTemplate from "./pages/ProfileTemplate.jsx"
import LogOutPage from './pages/LogoutPage.jsx'
import EditProfilePage from './pages/EditProfilePage.jsx' 
import MessageBoardPage from './pages/MessageBoardPage.jsx'

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
    path: "/LogOutPage",
    element: <LogOutPage />
  },
  {
    path: "/VideoPage",
    element: <VideoPage />
  },
  {
    path: "/VideoPage/:videoId",
    element: <VideoTube />
  },
  {
    path: "/profile/:username",
    element: <ProfilePage />
  },
  {
    path: "/profile/:username/edit", // 👈 Add this route
    element: <EditProfilePage />
  },
  {
    path: "/profile-template",
    element: <ProfileTemplate />
  },
   {
    path: "/MessageBoardPage",
    element: <MessageBoardPage />
  }



])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)


