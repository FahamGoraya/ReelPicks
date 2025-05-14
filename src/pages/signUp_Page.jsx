import { useState,useEffect,useContext } from 'react'
import Movies_service from '../service/Movies_service'
import { useNavigate,useLocation } from 'react-router'
import './signup.css'

function Signup() {
  const navigae = useNavigate()
  const loc = useLocation()



  useEffect(()=>{
    document.body.classList.add('Signup-bg')

    return ()=>{
      document.body.classList.remove('Signup-bg')
    }
  } ,[loc])



  const handle_importance=(event)=>{
    navigae('/home')
  }

  return (
    <>
  
    <h1 className='signtext'>Sign Up</h1>
    <div>
    <button onClick={handle_importance}>login</button>
    </div>

    
    
    </>
  )
}

export default Signup