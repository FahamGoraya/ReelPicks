import { useState,useEffect,useContext } from 'react'
import Movies_service from './service/Movies_service'
import {cont} from './main'

function Importance() {
  const mov = useContext(cont)
    

  return (
    <>
    <ul>
    {mov.map( n=> <li key={n.id}>{n.id}</li> )}
    </ul>
    </>
  )
}

export default Importance