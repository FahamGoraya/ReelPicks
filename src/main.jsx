import { StrictMode,useState,useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router'
import Importance from './Importance.jsx'
import { createContext } from 'react'
import Movies_service from './service/Movies_service.js'

export const cont = createContext([])

const router = createBrowserRouter([{
path: "/",
element: <App />
},
{
  path: "/importance",
  element:<Importance/>

}
])

const R =()=>{
  const [movie,setMovies] = useState(null)

  const hook =()=>{
    Movies_service.getMovies()
    .then(result=>
    {
      setMovies(result)
    }
    )
  }

  useEffect(hook,[])
  
  if(movie == null){
    return(
      <>
      <h1>Data Loading</h1>
      </>
    )
  }



  return(
    <cont.Provider value={movie}>
      <RouterProvider router={router} />
    </cont.Provider>
    

  )

}





  createRoot(document.getElementById('root')).render( 
    <R/>
  )

