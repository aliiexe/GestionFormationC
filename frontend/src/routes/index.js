import {createBrowserRouter} from 'react-router-dom'
import GuestLayout from '../layouts/GuestLayout'
import Landing from '../pages/Landing.jsx'
import AdminLayout from '../layouts/AdminLayout.jsx'
import SignUp from '../pages/SignUp/SignUp.jsx'
import Login from '../pages/Login/login'
import Recuperation from '../pages/Recuperation.jsx'
import Gestionroles from '../components/Roles/GestionRoles.jsx'
import competences from '../components/Admin/Competences'
import Certification from '../components/Admin/Certification'
import Region from '../pages/Admin/Region'
import Intervenant from '../pages/Admin/Intervenant.jsx'
import Etablissement from '../pages/Admin/Etablissement.jsx'
import Domaine from '../pages/Admin/Domaine'
import Plan from '../pages/Admin/Plan.jsx'
import Action from '../pages/Admin/Actions.jsx'
import Formation from '../pages/Admin/Formation.jsx'
import PassReset from '../pages/PassReset/PassReset.jsx'
import Dashboard from '../pages/Admin/Dashboard.jsx'
import Formations from '../pages/Formations.jsx'
import Actions from '../pages/Entreprise/Actions.jsx'
import MesActions from '../pages/Entreprise/MesActions.jsx'

export const router=createBrowserRouter([
    {Component:GuestLayout,children:[{path:"/",Component:Landing},
      {path:'/Register',Component:SignUp },
      {path:'/Login',Component:Login},
      {path:'/Formations',Component:Formations},
      {path:'/recupere',Component:Recuperation},
      {path:'/competences',Component:competences},
      {path:'/actions',Component:Actions},
      {path:'/certifications',Component:Certification},
      {path:'/password-reset/:token',Component:Recuperation},
      {path:'/reset',Component:PassReset},
      {path:'/mesactions',Component:MesActions},
    ]}
    ,
    {Component:AdminLayout,children:[
        {path:"/",Component:Landing},
        {path:'/roles',Component:Gestionroles},
        {path:'/formation',Component:Formation},
        {path:'/intervenant',Component:Intervenant},
        {path:'/regions',Component:Region},
        {path:'/etablissement',Component:Etablissement},
        {path:'/domaines',Component:Domaine},
        {path:'/dashboard',Component:Dashboard},
        {path:'/plan',Component:Plan},
        {path:'/action',Component:Action}
    ]}
])