import { useState,useEffect,createContext, useContext } from 'react'
import Movies_service from './service/Movies_service'
import { useNavigate } from 'react-router'
import {cont} from './main'


function App() {
  const navigae = useNavigate()
  const movie = useContext(cont)  

  const handle_importance=(event)=>{
    console.log("yesa")
    navigae('/importance')
  }


   

  return (
    <>
    <ul>
    {movie.map( n => <li key={n.id}>{n.content}</li>)}
    </ul>
    <button onClick={handle_importance}>Check out importance</button>
    </>
  )
}

export default App
