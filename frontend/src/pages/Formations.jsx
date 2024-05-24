import { useEffect, useState } from "react"
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { errorParagraphProps, } from './Login/animations/animationProps';
import { axiosclient } from "../api/axiosClient";
export default function Formations(){
  const schema = yup.object().shape({
   
  });
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const formFields = [
  


    {
      labelText: "Rechercher",
      name: "Search",
      type: "text",
      register: "Search"
    },
  
  ];
const[formations,setformations]=useState([])
useEffect(()=>{
  axiosclient.get('/plan').then((a)=>{
  setformations(a.data)
  console.log(a.data)
  })
},[])
const onSubmit=(e)=>{
  console.log(e);

}
    return(
        <>
  <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#529BE1] to-[#008B45] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
          <div style={{"padding":"5%"}}>
<div style={{textAlign:"center"}}>
    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl" style={{marginBottom:"0"}}>Nos Formations</h1>
 
    <div style={{display:"flex",justifyContent:"center"}}>
    <form onSubmit={handleSubmit(onSubmit)}  className='signup-form' >
      <br></br>

        <div className="signup-field" >
          <input style={{left:"0%"}}
          onChange={(e)=>{
            if(e.target.value){
            setformations([...formations.filter(ele=>ele.description.includes(e.target.value))])}else{
              axiosclient.get('/plan').then((a)=>{
                setformations(a.data)
                console.log(a.data)
                })
            }
          }}
            name={"search"}
            placeholder={"Rechercher"}
            autoComplete="off"
            defaultValue=""
  
          />
          <label htmlFor={"rechercher"} className="signup-field-label-wrapper">
            <span className="signup-field-label-text">
           Rechercher
            </span>
          </label>
         
        </div>


    </form>
    </div>
</div>          </div>
<div style={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
{formations.map((ele)=>{

return(
<div key={1} className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover" src={"images/"+ele.image} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white"></span>
            </a>
            <div className="mt-4 px-5 pb-5">
                <a href="#">
                    <h5 className="text-xl tracking-tight text-slate-900">{ele.etablissement.nom_efp}</h5>
                </a>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">{ele.description}</span>&nbsp;&nbsp;&nbsp;
                        <br></br><span className="text-l text-slate-900">{ele.theme.intitule_theme}</span>
                    </p>
                </div>
                <Link to={"/Actions"}  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M14.707 10.707a1 1 0 0 0-1.414-1.414L10 12.586 7.707 10.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l5-5z" />
                    </svg>
               Voir plus
                </Link>
            </div>
        </div>
)})}
        </div>
    </div>
        </>
    )
}