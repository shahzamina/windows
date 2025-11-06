import React from 'react'
import { Link } from 'react-router-dom'
import Contact from './Contact'
const Contform = () => {
    const img='/images/home.jpg'
const ch='Contact Form'
  return (
    <>
<div className='dyn'>
 <div className='oth-ser' style={{height:"35vh"}} >
          <h1  className='mt-5 ' style={{wordSpacing:'1px',fontFamily:'Lato'}}>Get In Touch with us </h1>
        
</div>


    <div style={{marginTop:'6%'}}>
       <Contact  img={img} ch={ch}/>


    </div>

    
          </div>
    </>
  )
}

export default Contform
