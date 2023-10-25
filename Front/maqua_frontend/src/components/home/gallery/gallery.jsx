import React from "react";
import {Carousel} from 'react-bootstrap';
import './gallery.scss';

const images = [
    {
        id:1,
        route: require('../../../assets/images/Image1.jpeg'),
        title: 'CLASES DE NATACIÓN A DOMICILIO EN MEDELLÍN',
        description: 'Clases en inglés y español, para todas las edades'
    },
    {
        id:2,
        route: require('../../../assets/images/Image2.jpeg'),
        title: 'CLASES DE NATACIÓN A DOMICILIO EN MEDELLÍN',
        description: 'Clases en inglés y español, para todas las edades'
    },
    {
        id:3,
        route: require('../../../assets/images/Image3.jpeg'),
        title: 'CLASES DE NATACIÓN A DOMICILIO EN MEDELLÍN',
        description: 'Clases en inglés y español, para todas las edades'
    },
    {
        id:4,
        route: require('../../../assets/images/Image4.jpeg'),
        title: 'CLASES DE NATACIÓN A DOMICILIO EN MEDELLÍN',
        description: 'Clases en inglés y español, para todas las edades'
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
                        <h2>{image.title}</h2>
                        <p>{image.description}</p>
                        <button className="btn__light">Programa tu clase de prueba</button>
                        </Carousel.Caption>
                    </Carousel.Item>
                )
            })}
            </Carousel>
        </section>
    )
}

export { Gallery };