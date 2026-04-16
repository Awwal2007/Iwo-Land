import React from 'react'
import SEO from '../components/SEO'
import SideBar from '../components/SideBar'
import backgroundImage from '../assets/Gold Background2.jpg'
import './css/Leadership.css'

const Leadership = () => {
  const leadershipSchema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "The Royal Institution of Iwoland",
    "mainEntity": {
      "@type": "Person",
      "name": "HIM Oba (Dr.) Abdulrosheed Adewale Akanbi",
      "jobTitle": "Oluwo of Iwoland",
      "alternateName": "Telu I"
    }
  };

  return (
    <div>
      <SEO 
        title="Leadership & Royal Institution - Iwoland Official"
        description="Meet the leadership of Iwoland. Learn about the Oba (Dr.) Abdulrosheed Adewale Akanbi and the traditional governance of the Iwo Kingdom."
        schema={leadershipSchema}
      />
      <div className='home-container'>
        <h2 style={{color:"#222222", fontSize: "35px", fontWeight: "600"}}>LEADERSHIP & ROYAL INSTITUTION</h2>
      </div>
      
      <div className="home-content">
        <div className='first-side'>
          <div className="royal-banner" style={{ 
            padding: '40px', 
            borderRadius: '12px', 
            textAlign: 'center',
            color: '#333',
            marginBottom: '30px'
          }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>HIM Oba (Dr.) Abdulrosheed Adewale Akanbi</h1>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '400' }}>The Oluwo of Iwoland, Telu I</h3>
          </div>

          <div className="leadership-text-section">
            <h3 style={{ borderBottom: '2px solid #ab833b', display: 'inline-block', marginBottom: '20px' }}>The Traditional Governance</h3>
            <p>The leadership of Iwoland is centered around the <strong>Oluwo of Iwoland</strong>, a position of supreme traditional authority and spiritual leadership. The current monarch, HIM Oba (Dr.) Abdulrosheed Adewale Akanbi, is a visionary leader dedicated to the modernization of Iwo while preserving its ancient traditions.</p>

            <h4 style={{ marginTop: '20px' }}>The Council of Chiefs</h4>
            <p>Assisting the Oluwo is the <strong>Iwo Council of Chiefs</strong>, a body of respected elders and community leaders who represent different quarters and interests within the kingdom. They play a vital role in local administration, dispute resolution, and cultural preservation.</p>

            <h4 style={{ marginTop: '20px' }}>Modern Leadership</h4>
            <p>Beyond traditional roles, Iwoland is home to prominent leaders in education, business, and politics. This synergy between the royal institution and modern professional sectors ensures that Iwoland continues to thrive as a hub of progress in Osun State.</p>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h4 style={{ color: '#ab833b' }}>Official Correspondence</h4>
            <p>For official inquiries regarding the Royal Institution or leadership matters, please use the contact information provided in the footer of this official website.</p>
          </div>
        </div>
        <div className='second-side'>
          <SideBar />
        </div>
      </div>
    </div>
  )
}

export default Leadership
