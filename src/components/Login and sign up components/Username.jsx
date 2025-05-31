import { useState } from "react"
import "../../pages/Login.css"
function Username (){
    const [name,SetName] = useState("")
    
    const handle_User =(event)=>{
        SetName(event.target.value)
    }


    
        return(
            <>
            <h4 className="SignupHeading">Username : </h4>
            <input className="SignupText"  value={name} onChange={handle_User} />     
            </>
        )

    }


export default Username