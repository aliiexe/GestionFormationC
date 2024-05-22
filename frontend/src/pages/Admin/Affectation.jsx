import { useState } from "react"
import { axiosclient } from "../../api/axiosClient"

export default function Affectation() {
    const [affectations,setaffectations]=useState([])
    const [affectation,setaffectation]=useState({})
    const [intervenants,setintervenants]=useState([])
    const [competences,setcompetences]=useState([])

    const handleSubmit = (e) => {
      e.preventDefault();
      axiosclient.post('affectation',affectation).then((res)=>{
        console.log(res)
      })
    }

    const handleChange = (e) => {
      if(isselect) {
        
      }
    }
    
  return (
    <div>
      
    </div>
  )
}
