import axios from "axios"
import { axiosclient } from "../../api/axiosClient"

export default function Competence() {
    const [competences,setcompetences]=useState([])
    const [competence,setcompetence]=useState({})

    const handleSubmit=(e)=>{
        e.preventDefault();
        axiosclient.post('/competence',competence).then((res)=>{
            console.log(res.data)
        })
    }

    const handleChange=(e)=>{
        setcompetence({...competence,[e.target.name]:e.target.value})
    }

    const handleDelete=(id)=>{
        axiosclient.delete(`/competence/${id}`).then((res)=>{
            console.log(res.data)
        })
    }

    const handleUpdate=(record)=>{
        axiosclient.put(`/competence/${record.id}`,record).then((res)=>{
            console.log(res.data)
        })
    }
    
    useEffect(()=>{
        axiosclient.get('/competence').then((res)=>{
            setcompetences(res.data)
        })
    });

  return (
    <div>
      
    </div>
  )
}
