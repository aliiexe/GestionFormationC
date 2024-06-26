import {useState, useEffect} from 'react'
import Form from './Form/Form'
import Modal from './Modal/Modal'
import './SignUp.css'
import { animateWordChange } from './animations/animateWords'
import { gsapLandingAnimation } from './animations/gsapAnimation'
import {termsOfService} from './ToS.js'
import { useNavigate } from 'react-router'


const SignUp = () => {
    const navigate=useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [openToS, setOpenToS] = useState(false)
    const [name,setName] = useState("")
    
    useEffect(()=> {
      

       
        var mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if(!mediaQuery.matches) {
            gsapLandingAnimation();
        }
        animateWordChange();
        if(window.localStorage.getItem('token')){
            navigate('/')
        }else{
            return
        }   
    }, [])

    return (
        <div className='sign-up-page'>
            <main className='sign-up-container'>
            <div  className="sign-up-left sign-up-column">
                <h1 >
                    <span className='font-bold'>Formation &nbsp;
                        <span  >
                        <span className="word font-blod" style={{color: "#008B45"}}>continue</span>
                        <span className="word font-blod">excitant</span></span>
                    </span>
                    <span className='font-bold'>pour vous enrichir</span>
                </h1>
                <p>
                    L'office de formation proffesionel de la promoion de travail propose une variéte de programmes de formation continue   
                </p>
            </div>
            <div className="sign-up-right sign-up-column">
                 <div><img src='../../../public/images/OFPPT.png' className='img' style={{"height":"50px !important"}}></img></div>
                <Form setName={setName} setIsOpen={setIsOpen} setOpenToS={setOpenToS} />
               
            </div>
            </main>
          
        </div>
    )
}

export default SignUp
