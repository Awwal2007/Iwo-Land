import React from 'react'
import { SlPeople } from 'react-icons/sl'
import ImageCarousel from '../components/ImageCarousel'
import SideBar from '../components/SideBar'
import SEO from '../components/SEO'

const IwoLand = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "GovernmentOrganization",
      "name": "Iwo Kingdom",
      "description": "The ancient crown of Iwo Kingdom, a prominent Yoruba town in Osun State, Nigeria."
    }
  };

  return (
    <div>
      <SEO 
        title="About Iwoland - History, Culture & Heritage"
        description="Learn about the rich history of Iwoland, the descendants of Adekola Telu, and the cultural significance of one of Yorubaland's most prominent kingdoms."
        schema={aboutSchema}
      />
      <div className='home-container'>
        <h2 style={{color:"#222222", fontSize: "35px", fontWeight: "600"}}>ABOUT IWO LAND</h2>
      </div>
      <div className="home-content">
          <div className='first-side'>
              <div>
                <ImageCarousel />
              </div>
              <div className="about-text-section" style={{ marginTop: '20px' }}>
                <p>Iwo is a prominent Yoruba town in Osun State, southwestern Nigeria. Rich in cultural, spiritual, and historical heritage, Iwo has long been an important center of Yoruba civilization. It was founded by Adekola Telu, the son of Luwo Gbagida, a female Ooni of Ife — one of the few female traditional rulers in Yoruba history.</p>
                
                <h3 style={{ marginTop: '20px', color: '#ab833b' }}>The Official Gateway to Iwo Heritage</h3>
                <p>This is the <strong>official digital authority</strong> for Iwoland. Our mission is to preserve the authentic history of the Iwo Kingdom and provide a verified platform for royal announcements, cultural education, and community updates.</p>

                <h4>Discover the Iwo People</h4>
                <p>The people of Iwo are predominantly Yoruba-speaking, culturally rich, religiously diverse, and proud of their deep-rooted heritage. They are widely respected for their resilience, hospitality, and contributions to religion, education, and culture in Nigeria.</p>
                
                <h4>The Royal Institution</h4>
                <p>Iwo is the ancestral home of the <strong>Oluwo of Iwo</strong>, one of the most revered monarchs in Yorubaland. The royal palace stands as a symbol of authority, tradition, and the enduring pride of Yoruba royalty. As a kingdom that blends deep-rooted Islamic heritage, vibrant Christian institutions, and traditional beliefs, Iwo remains a beacon of religious harmony and spiritual history.</p>
              </div>

              <section className="values-container" style={{ marginTop: '40px' }} aria-label="Core values of Iwo Land">
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "20px" }}>
                    {[
                      { title: "ANCENSTRAL PRIDE", desc: "Honoring the legacy of Adekola Telu and our royal lineage." },
                      { title: "CULTURAL UNITY", desc: "A harmonious blend of traditions, faiths, and people." },
                      { title: "MODERN PROGRESS", desc: "Leading Iwoland into a future of education and development." },
                    ].map((val, index) => (
                      <div className="people-container" key={index} style={{ flex: "1 1 250px", textAlign: "center" }}>
                        <SlPeople className="people-icon" color="#ab833b" size={50} />
                        <h3>{val.title}</h3>
                        <p>{val.desc}</p>
                      </div>
                    ))}
                  </div>
              </section>

              <div>
                <h2 style={{ textAlign: "center", marginTop: "45px", marginBottom: "25px" }}>The Iwo People in Pictures</h2>
                <ImageCarousel />
              </div>
          </div>
          <div className='second-side'>
            <SideBar />
          </div>
      </div>
    </div>
  )
}

export default IwoLand