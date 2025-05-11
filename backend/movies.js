const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocoldssdsfafsfasf",
    important: true
  }
]

  app.get('/api/persons',(request,response)=>{
    response.json(notes)
  }
  )

  app.get('/api/persons/:id',(request,response)=>{
    const id = request.params.id
    const temp = notes.filter(n=>n.id===id)
    if(temp.length>0){
      response.json(temp)
    }
    else{
      response.status(404).end()
    }

  })

  


  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  