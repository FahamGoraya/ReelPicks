import { StrictMode,useState,useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import { createContext } from 'react'
import Signup from './pages/signUp_Page.jsx'
import Movie_page from './pages/Movie_page/Movie_page.jsx'

const router = createBrowserRouter([{
path: "/",
element: <Signup />
}
,
{
  path: "/home",
  element:<App/>

},
{
  path: "/home/:id",
  element:<Movie_page/>
}
])

const R =()=>{
  return (<RouterProvider router={router} />)
}

  createRoot(document.getElementById('root')).render( 
    <R/>
  )

