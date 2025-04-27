import './SiteMap.css'
import { Link, Route } from "react-router-dom"

function SiteMap() {
    return (
        <div className='SiteMap'>
            <h2 className='sitemap-title'>Site Map</h2>
            <div className='sitemap-container'>
                <div className='sitemap-container-left'>
                    <Link to ='/' className='sitemap-container-item'>HOME</Link>
                    <Link to ='/rank' className='sitemap-container-item'>RANK</Link>
                    <Link to={`/lane?word=SITE Map`} className='sitemap-container-item'>LANE</Link>
                    <Link to ='/contact' className='sitemap-container-item'>CONTACT</Link>
                </div>
                <div className='sitemap-vertical-line'/>
                <div className='sitemap-container-right'>
                    <Link to ='/about' className='sitemap-container-item'>ABOUT</Link>
                    <Link to ='/sitemap' className='sitemap-container-item'>SITE MAP</Link>
                    <Link to ='/FAQs' className='sitemap-container-item'>FAQS</Link>
                </div>
            </div>
        </div>
    )
}

export default SiteMap