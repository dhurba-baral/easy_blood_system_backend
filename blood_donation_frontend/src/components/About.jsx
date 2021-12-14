import Navbar from './Navbar';
import Footer from './Footer'
import Hero from './Hero';

const About = () => {

    return (
        <>
            <Navbar/>
            <Hero title="About" desc="A brief description about Covid Help System"/>
            <div className="container">
                <div className="text-center about-description">

                <p>COVID Help System is a web based application where any person with need for any kind of COVID-19 related services can post their problems and others who can offer help to those problems can offer help in real time.</p>                             
                <p>The objective of the project is to provide a live online platform where the people who are suffering from the COVID-19 pandemic and the people who are willing to help those who are suffering can get to know each other so that the covid patients can get proper treatment and services in time.</p>                             
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default About;