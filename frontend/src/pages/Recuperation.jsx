
import { useLocation, useParams } from 'react-router';
import { axiosclient } from '../api/axiosClient';
import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { errorParagraphProps, } from './Login/animations/animationProps';
import '../pages/Login/Form/Form.css';
import {Modal,Input, Button} from 'antd';

import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
export default function Recuperation(){
   const {token}=useParams()
   const location=useLocation()
   const searchParams = new URLSearchParams(location.search);
   const email = searchParams.get('email');
   
const formFields = [
  


  {
    labelText: "Mot de passe",
    name: "password",
    type: "password",
    register: "password"
  },

];


  const schema = yup.object().shape({
   
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [user, setUser] = useState({


    email: "",
    password: "",

  });
  const navigate=useNavigate()



  
  const onSubmit=(e)=>{
    console.log(e);
    axiosclient.post('/reseter',{email:email,password:e.password}).then(a=>console.log(a))
  }
return (
<>

<div style={{"display":"flex",flexDirection:"column","justifyContent":"center","alignItems":"center" ,"height":"100vh"}}>
  <img src={"/images/ofppt-logo.png"}></img>
    <form onSubmit={handleSubmit(onSubmit)}  className='signup-form' >
      <br></br>
      <div>reintialiser mot de passe pour {email}</div>
      {formFields.map((field, index) => (
        <div className="signup-field" key={index}>
          <input
          onChange={(e)=>console.log(e.target.value)}
            type={field.type}
            id={field.name}
            aria-invalid={errors[field.register] ? "true" : "false"}
            aria-describedby={field.register}
            name={field.name}
            placeholder={field.labelText}
            autoComplete="off"
            defaultValue=""
            {...register(field.register)}
          />
          <label htmlFor={field.name} className="signup-field-label-wrapper">
            <span className="signup-field-label-text">
              {field.labelText}
            </span>
          </label>
         
        </div>
      ))}
      <input type="submit" value="Se connecter" />
      <div style={{"textAlign":"center","textDecoration":"underline"}}><Link to={"/register"}>Create account</Link></div>
      <div style={{"textAlign":"center","textDecoration":"underline"}}><div onClick={()=>{setopenmodel(true)
      }}>mot de passe oublié?</div></div>
    </form>
    </div>
</>
  )

}
