import "./AboutUs.css"

function AboutUs() {
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
                    <div className="developers">
                        <img src="" alt="picture of Giancarlo B. De Jesus" />
                        <p>Giancarlo B. De Jesus is a full-stack developer and web application developer at Yber Digitals, currently a 3rd-year BSIT student in CCS. With a strong foundation in both front-end and back-end technologies, he specializes in creating user-friendly and efficient digital solutions.</p>
                    </div>
                    <div className="developers">
                        <img src="" alt="picture of Lance Christian L. Villanueva" />
                        <p>Lance Christian L. Villanueva is a 3rd-year Bachelor of Science in Information Technology (BSIT) student at Silliman University, specializing in back-end development. With a strong foundation in web and software development, he has worked on various projects utilizing PHP and React.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUs;