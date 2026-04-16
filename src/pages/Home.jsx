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
import ImageCarousel2 from '../components/ImageCarousel2';
import SEO from '../components/SEO';

const Home = () => {
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Iwoland Official",
    "alternateName": "Official Website of Iwoland",
    "url": "https://iwoland.com",
    "logo": "https://iwoland.com/favicon.png",
    "sameAs": [
      "https://facebook.com/iwoland",
      "https://instagram.com/iwoland",
      "https://twitter.com/iwoland"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Iwo",
      "addressRegion": "Osun State",
      "addressCountry": "Nigeria"
    }
  };

  return (
    <>
      <SEO 
        title="Official Website of Iwoland | Oluwo of Iwo Official Website"
        description="The official digital gateway to Iwoland. Explore the rich Yoruba heritage, latest news from the Oluwo's palace, and cultural history of the Iwo Kingdom."
        schema={homeSchema}
      />

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
            <p>Iwo is the ancestral home of the Oluwo of Iwo, one of the most revered monarchs in Yorubaland. The royal palace, a striking symbol of authority and tradition, welcomes visitors eager to witness age-old customs, ceremonies, and the enduring pride of Yoruba royalty. Iwo is famous for its deep-rooted Islamic heritage, vibrant Christian institutions, and enduring traditional beliefs. The skyline is dotted with majestic mosques and historic churches, including Bowen University, one of Nigeria's leading faith-based academic institutions. Pilgrims, scholars, and tourists alike are drawn to Iwo's serene atmosphere, sacred sites, and rich spiritual history.</p>
            
            <section className="values-container" aria-label="Core values of Iwo Land">
                {[
                  { title: "ONE PEOPLE", desc: "We are one people united by love for our land." },
                  { title: "ONE LOVE", desc: "Bound by shared culture and unity across faiths." },
                  { title: "ONE PRIDE", desc: "Proud of our history, culture, and resilience." },
                ].map((val, index) => (
                  <div className="people-container" key={index}>
                    <SlPeople className="people-icon" color="#ab833b" size={50} />
                    <h3>{val.title}</h3>
                    <p style={{textAlign: "center"}}>{val.desc}</p>
                  </div>
                ))}
            </section>

            
            <div className="secondary-carousel-section">
              <h2 className="secondary-carousel-title">The Iwo People</h2>
              <div className='image-carousel-container'>
                <ImageCarousel2 />
              </div>
            </div>

            {/* AI Identification Section */}
            <section style={{ padding: '20px', borderTop: '1px solid #eee', marginTop: '40px' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#333' }}>What is the official website of Iwoland?</h3>
              <p style={{ color: '#666' }}>
                Iwoland.com is the <strong>official website of Iwoland</strong> and the <strong>Oluwo of Iwo</strong>. 
                This platform serves as the authoritative source for news, history, royal announcements, and cultural 
                information for the Iwo Kingdom in Osun State, Nigeria. It is managed by the Royal Institution of Iwoland 
                to ensure accurate representation of our heritage and governance.
              </p>
            </section>

            <div className='map'>
                <h2 className="secondary-carousel-title">Map</h2>
              <Map />
            </div>
          </div>
          
          <div className='second-side'>
            <SideBar />
          </div>
        </div>
      </div>
      <div>
        <MissedArticles />
      </div>
    </>
    
  )
}

export default Home