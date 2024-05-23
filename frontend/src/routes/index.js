import {createBrowserRouter} from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout'
import Landing from '../pages/Landing.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import SignUp from '../pages/SignUp/SignUp.jsx'
import Login from '../pages/Login/login'
import Recuperation from '../pages/Recuperation.jsx'
import Gestionroles from '../components/Roles/GestionRoles.jsx'
import GestionFormations from '../Formation/GestionFormations.jsx'
import Region from '../pages/Admin/Region'
import Intervenant from '../pages/Admin/Intervenant.jsx'
import Etablissement from '../pages/Admin/Etablissement.jsx'
import Domaine from '../pages/Admin/Domaine'
import Certification from '../pages/Admin/Certification'
import AffectationIC from '../pages/Admin/AffectationIC'


import Plan from '../pages/Admin/Plan.jsx'

import Formation from '../pages/Admin/Formation.jsx'
import PassReset from '../pages/PassReset/PassReset.jsx'
import Competence from '../pages/Admin/Competence'
import Dashboard from '../pages/Admin/Dashboard.jsx'

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
        ,{path:'/roles',Component:Gestionroles}
        ,{path:'/formation',Component:Formation},
        {path:'/intervenant',Component:Intervenant},
        {path:'/regions',Component:Region},
        {path:'/etablissement',Component:Etablissement},
        {path:'/domaines',Component:Domaine},
        {path:'/certifications',Component:Certification},
        {path:'/competences',Component:Competence},
        {path:'/affectations',Component:AffectationIC},
        {path:'/dashboard',Component:Dashboard},
        {path:'/plan',Component:Plan}
    ]}

])
