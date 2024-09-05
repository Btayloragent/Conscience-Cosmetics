import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import LandingPage from './pages/landingPage.jsx'
import MakeUpPage from './pages/makeUpPage.jsx'
import VideoPage from './pages/VideoPage.jsx'
import CosmeticPage from './pages/CosmeticPage.jsx'




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
  }
 

]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)