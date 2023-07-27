import React, { useEffect } from 'react';
import "./styles/about.css";
// import "../../styles/about.css";

const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    
    return (
        <div className="about_container">
            <div className="about">
                <div className="about_content">
                    <h2>About Us</h2>
                    <p> Hello Friends! Welcome To our Website/Blog. </p>
                    <p> I am a student and a technology enthusiast who is curious to find and review new gadgets like Laptops, Monitors, Keyboards, Mouse, Headphones and much more. </p>
                    <p> I have been continuously in research of gadgets, their usage, technology they use, and whenever I find’s It will be also helpful for someone, I love to share it here. </p>
                    <p> I think People around the globe also searching for the same information daily, so I have decided to provide the information here which will be accessible for all. </p>
                    <p> The Provided content is best and based on my learning, research and understanding of gadgets and latest technology. I have gone through various research and analyzed several factors before concluding a final product/tips/suggestions. </p>
                    <p>  This is one of the best Blogs for free Tips, guides and reviews about gadgets. This Platform is created to help people find best deals, reviews on different gadgets all at one place. Please do share our tips and post to support us for creating more future valuable contents. Also make sure to subscribe our mailing list for future updates. </p>

                </div>
            </div>
        </div>
    )
}

export default About