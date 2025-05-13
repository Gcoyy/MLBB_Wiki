import "./AboutUs.css"
import {db} from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import { useState, useEffect } from "react"

function AboutUs() {
    const [developers, setDevelopers] = useState([])

    useEffect(() => {
        const getDevelopers = async () => {
            try {
                const developerCollection = collection(db, "about us");
                const developerSnapshot = await getDocs(developerCollection);
                const developerDocuments = developerSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setDevelopers(developerDocuments);
            } catch (error) {
                console.error("Error fetching developer documents: ", error);
            }
        }
        getDevelopers()
    }, [])

    return (
        <div className="AboutUs">
            <div className="about-us-container">
                <h1> About Us </h1>
                <div className="about-us-content">
                    <p>At Mobile Legends Wiki, we believe that accessibility and inclusivity should be at the heart of every digital experience. Our mission is to create a seamless, user-friendly platform that caters to everyone, regardless of their abilities.</p>
                    <br />

                    <p>We are committed to providing customizable settings that empower users to interact with our website in the way that best suits their needs. From color-blind modes and dyslexia-friendly fonts to visual sound alerts, we strive to ensure that every user can navigate with ease and comfort.</p>
                </div>
            </div>

            <hr />

            <div className="developers-container">
                <h1>Developers</h1>
                <div className="developers-content">
                    {developers.map(developer => (
                        <div className="developers" key={developer.id}>
                            <img className="picture" src={developer.picture} alt={developer.alt} />
                            <p>{developer.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AboutUs;
