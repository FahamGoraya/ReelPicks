import { useState,useEffect } from 'react'
import Movies_service from './service/Movies_service'

function App() {
  const [count, setCount] = useState(0)
  const [note,setNotes] = useState([])
  
  const hook=()=>{
    Movies_service.getMovies()
    .then((result) =>{
      setNotes(result)
      console.log(result)
    })

  }

  useEffect(hook,[])
   

  return (
    <>
    <ul>
    {note.map( n => <li key={n.id}>{n.content}</li>)}
    </ul>

    </>
  )
}

export default App
