import {createBrowserRouter} from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout'
import Landing from '../pages/Landing.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import SignUp from '../pages/SignUp/SignUp.jsx'
import Login from '../pages/Login/login'
import Recuperation from '../pages/Recuperation.jsx'
import GestionIntervenants from '../components/Admin/GestionIntervenants'
import Gestionroles from '../components/Roles/GestionRoles.jsx'
import GestionFormations from '../Formation/GestionFormations.jsx'
import PassReset from '../pages/PassReset/PassReset.jsx'

export const router=createBrowserRouter([
    {Component:GuestLayout,children:[{path:"/",Component:Landing},
      {path:'/Register',Component:SignUp },
      {path:'/Login',Component:Login},
      {path:'/recupere',Component:Recuperation},
      {path:'/reset',Component:PassReset}
  ]}
    ,
    {Component:AdminLayout,children:[
        {path:"/",Component:Landing}
        ,{path:'/intervenants',Component:GestionIntervenants}
        ,{path:'/roles',Component:Gestionroles}
        ,{path:'/formation',Component:GestionFormations}
    ]}

])