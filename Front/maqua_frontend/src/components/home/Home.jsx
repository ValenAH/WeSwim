import React from "react";
import './Home.scss';
import { Gallery } from "./gallery/gallery";
import { ContactForm } from "./contact-form/contact-form";

const Home = () => (
    <div>
        <Gallery/>
        <ContactForm/>
    </div>
    
)
export {Home};
