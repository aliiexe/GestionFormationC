import  {Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { axiosclient } from '../api/axiosClient'
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { useNavigate } from 'react-router'


export default function AdminLayout() {
  
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [user,setuser]=useState(null)
  const navigate=useNavigate()

  useEffect(()=>{if(window.localStorage.getItem('token')){
    axiosclient.get('/api/user').then((a)=>{
      setuser(a.data)
      if(a.data.email != 'x@gmail.com'){
        navigate('/')
    }else{
        return
    }   
    })
  }else{
    navigate('/')
  }
  },[])
  return (
    <div className='main'>
      <aside className="sidebar">
        <div className="top">
          <div className="loogo">
          <a href="/intervenants" >
            <img src="/images/ofppt-logo.png" width="100px" alt="Logo" />
          </a>
          </div>
      
          <div className="menu">
            <nav>
              <Link to={"/intervenants"} className={`menu-item ${isActive('/') ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-columns-gap icon" viewBox="0 0 16 16">
                <path d="M6 1v3H1V1zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1zm14 12v3h-5v-3zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM6 8v7H1V8zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1zm14-6v7h-5V1zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1z"/>
              </svg>
                Intervenants
              </Link>
              <Link to={'/formation'} className={`menu-item ${isActive('/formateurs') ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-video3 icon" viewBox="0 0 16 16">
                <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2"/>
                <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z"/>
              </svg>
                Formations
              </Link>
            </nav>
          </div>
        </div>
        <div className="bottom">
          <div className="user-info">
            <div className="user">
              <img src="avatar.jpg" alt="avatar" className="avatar"/>
              <span className="username">{user?.name}</span>
            </div>
            <Link to="/" className="logout" onClick={()=>{
              axiosclient.post('/logout').then(()=>{
                window.localStorage.removeItem('token')
              })
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="logout-icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
            </Link>
          </div>
        </div>
      </aside><br /><br /><br />
      <Outlet></Outlet>
    </div>
  )
}
