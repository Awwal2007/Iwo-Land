import React from 'react';
import './css/Home.css'
import { Link } from 'react-router-dom'
import CustomMarquee from '../components/CustomMarquee'
import ImageCarousel from '../components/ImageCarousel'
import LatestNews from '../components/LatestNews'
import SideBar from '../components/SideBar'
import { SlPeople } from 'react-icons/sl'
import MissedArticles from '../components/MissedArticles'
import { Button } from '@mui/joy'
import ButtonBar from '../components/BottomBar'
import Map from '../components/Map';

const Home = () => {
  return (
    <div className="home-wrapper">
      <div className='marquee-container'>
        <div className='latest-news'>Latest News</div>
        <div className="marquee-wrapper">
          <CustomMarquee />
        </div>
      </div>
      
      <div className="hero-section">
        <div className='carousel'>
          <ImageCarousel />
        </div>
        <div className='latest-section'>
          <LatestNews />
        </div>
      </div>
      
      <div className='home-container'>
        <h2 className="home-title">Home</h2>
      </div>
      
      <div className="home-content">
        <div className='first-side'>
          <p>Iwo is a prominent Yoruba town in Osun State, southwestern Nigeria. Rich in cultural, spiritual, and historical heritage, Iwo has long been an important center of Yoruba civilization, It is founded by Adekola Telu, the son of Luwo Gbagida, a female Ooni of Ife — one of the few female traditional rulers in Yoruba history.</p>
          
          <h4>Discover the Iwo People</h4>
          <p>Iwo People are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage. They are widely respected for their resilience, hospitality, and contributions to religion, education, and culture in Nigeria.</p>
          
          <h4>Explore Our Land</h4>
          <p>Iwo is the ancestral home of the Oluwo of Iwo, one of the most revered monarchs in Yorubaland. The royal palace, a striking symbol of authority and tradition, welcomes visitors eager to witness age-old customs, ceremonies, and the enduring pride of Yoruba royalty, wo is famous for its deep-rooted Islamic heritage, vibrant Christian institutions, and enduring traditional beliefs. The skyline is dotted with majestic mosques and historic churches, including Bowen University, one of Nigeria's leading faith-based academic institutions. Pilgrims, scholars, and tourists alike are drawn to Iwo's serene atmosphere, sacred sites, and rich spiritual history.</p>
          
          <div className='values-container'>
            <div className='people-container'>
              <SlPeople className='people-icon' color='#ab833b' size={50}/>
              <h2>ONE PEOPLE</h2>
              <p>We are one group of people united by our love for our land and mutually work together, for the greater good of the Iwo Land</p>
            </div>
            <div className='people-container'>
              <SlPeople className='people-icon' color='#ab833b' size={50}/>
              <h2>ONE LOVE</h2>
              <p>We are one group of people united by our love for our land and mutually work together, for the greater good of the Iwo Land</p>
            </div>
            <div className='people-container'>
              <SlPeople className='people-icon' color='#ab833b' size={50}/>
              <h2>ONE PRIDE</h2>
              <p>We are one group of people united by our love for our land and mutually work together, for the greater good of the Iwo Land</p>
            </div>
          </div>
          
          <div className="secondary-carousel-section">
            <h1 className="secondary-carousel-title">The Iwo People</h1>
            <div className='image-carousel-container'>
              <ImageCarousel />
            </div>
          </div>

          <div className='map'>
              <h1 className="secondary-carousel-title">Map</h1>
            <Map />
          </div>
        </div>
        
        <div className='second-side'>
          <SideBar />
        </div>
      </div>
    </div>
  )
}

export default Home