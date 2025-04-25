import './Home.css'

function Home() {
    return (
        <>
            {/* <h1>Home</h1> */}
            <video className='video'autoPlay loop controls muted>
                <source src="/Home.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </>
    );
}

export default Home