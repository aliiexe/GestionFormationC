import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { motion, AnimatePresence } from 'framer-motion';
import { errorSignProps, errorParagraphProps } from '../animations/animationProps';
import './Form.css';
import { useState } from 'react';
import { axiosclient } from '../../../api/axiosClient.jsx';

const formFields = [
  {
    labelText: "Nom",
    name: "name",
    type: "text",
    register: "name"
  },

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
  {
    labelText: "Confirmer mot de passe",
    name: "password_confirmation",
    type: "password",
    register: "password_confirmation"
  }
];

const Form = ({ setIsOpen, setName, setOpenToS }) => {
  const schema = yup.object().shape({
   
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  const [user, setUser] = useState({
    name: "",

    email: "",
    password: "",
    password_confirmation: ""
  });

const onSubmit = (data) => {
  axiosclient.get('sanctum/csrf-cookie').then(()=>{
axiosclient.post('/register',data).then((a)=>{
  console.log(a)
  axiosclient.get('/api/user').then(a=>{
    console.log(a.data)
  })
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
      <input type="submit" value="Creer compte" />
    </form>
  );
};

export default Form;
