import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { errorSignProps, errorParagraphProps } from '../animations/animationProps';
import './Form.css';
import { useState } from 'react';
import { axiosclient } from '../../../api/axiosClient.jsx'; 
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const formFields = [
  

  {
    labelText: "Email",
    name: "email",
    type: "text",
    register: "email"
  },
  {
    labelText: "Mot de passe",
    name: "password",
    type: "password",
    register: "password"
  },

];

const Form = ({ setIsOpen, setName, setOpenToS }) => {
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

const onSubmit = (data) => {
  axiosclient.get('sanctum/csrf-cookie').then(()=>{
axiosclient.post('/login',data).then((a)=>{
  if(a.status==200 || a.status==204){
    window.localStorage.setItem('token','true')
   
  }
  if(data.email=="x@gmail.com"){
    navigate('/intervenants')
  }else{
    navigate('/')
  }
 

})})
console.log(data)
    setUser(data);
    reset({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password_confirmation: ""
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
      {formFields.map((field, index) => (
        <div className="signup-field" key={index}>
          <input
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
      <div style={{"textAlign":"center","textDecoration":"underline"}}><Link to={"/recuperation"}>mot de passe oublié?</Link></div>
    </form>
  );
};

export default Form;
