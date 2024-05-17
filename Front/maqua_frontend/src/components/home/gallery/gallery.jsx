import React from "react";
import {Carousel} from 'react-bootstrap';
import './gallery.scss';

const images = [
    {
        id:1,
        route: require('../../../assets/images/1.jpg'),
    },
    {
        id:2,
        route: require('../../../assets/images/2.jpg'),
    },
    {
        id:3,
        route: require('../../../assets/images/3.jpg'),
    },
    {
        id:4,
        route: require('../../../assets/images/4.jpg'),
    },
    {
        id:5,
        route: require('../../../assets/images/5.jpg'),
    },
    {
        id:5,
        route: require('../../../assets/images/6.jpg'),
    }
]

const Gallery = () => {

    return (
        <section className="carousel">
            <Carousel fade>
            {images.map(image=>{
                return (
                    <Carousel.Item className="d-flex justify-content-center" key={image.id}>
                        <img className="image" src={image.route.default}/>
                        <Carousel.Caption>
                            <a href="https://wa.me/573052587069" target="_blank">
                                <button className="btn__light" >Programa tu clase de prueba</button>
                            </a>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
            </Carousel>
        </section>
    )
}

export { Gallery };