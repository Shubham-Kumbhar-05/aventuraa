import React from 'react';
import './home.css'
import video from '../../Assets/video1.mp4'
import '../Home/home.scss'
import {FiFacebook} from 'react-icons/fi'
import {AiOutlineInstagram} from 'react-icons/ai'
import {SiTripadvisor} from 'react-icons/si'
import {BsListTask} from 'react-icons/bs'
import {TbApps} from 'react-icons/tb'
import Main from "../Main/Main"


const Home = () => {
//react hook to add the scroll


  return (

    <div className='OverFlowHome'>
    <section className='home'>
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type='video/mp4'></video>

        <div className='homeContent container'>
          <div className='textDiv'>
            
            <h1 data-aos="fade-up" className='homeTitle'> 
              Aventuraa
            </h1>
          </div>  

          <div className="homeFooterIcons flex">
            <div className="rightIcons">
              <FiFacebook className="icon"/>
              <AiOutlineInstagram className="icon"/>
              <SiTripadvisor className="icon"/>              
            </div>

            <div className="leftIcons">
              <BsListTask className="icon"/>
              <TbApps className="icon"/>
            </div>
          </div>
        </div>
   
        

    </section>

    <Main />
    </div>
  )
}

export default Home
