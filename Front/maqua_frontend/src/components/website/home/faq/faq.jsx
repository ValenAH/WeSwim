import React, { useState } from "react";
import "./faq.scss";

const faqItems = [
    { question: "¿Y si mi hijo tiene miedo al agua?", answer: "Es muy común y lo tenemos en cuenta. Nuestros instructores trabajan con paciencia y juegos para que los niños ganen confianza poco a poco, sin forzar. El avance es gradual y siempre en un entorno seguro." },
    { question: "¿Cuánto tiempo tarda en aprender?", answer: "Depende de la edad, la frecuencia de las clases y el objetivo (flotar, nadar estilo crol, etc.). Con 1 clase semanal, muchos niños logran desplazarse en el agua en unos meses. Te daremos una valoración inicial y expectativas realistas." },
    { question: "¿Y si llueve?", answer: "Si las condiciones climáticas afectan el desarrollo de la clase. En ese caso, tenemos la opción de reprogramar la clase en el mismo mes, en una fecha y hora acordada entre el alumno y el profesor." },
];

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="faq-section">
            <div className="container py-5">
                <h2 className="faq-section__title text-center">Preguntas frecuentes</h2>
                <div className="faq-list">
                    {faqItems.map((item, index) => (
                        <div key={index} className={`faq-item ${openIndex === index ? "faq-item--open" : ""}`}>
                            <button
                                type="button"
                                className="faq-item__question"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                aria-expanded={openIndex === index}
                                aria-controls={`faq-answer-${index}`}
                                id={`faq-question-${index}`}
                            >
                                <span>{item.question}</span>
                                <span className="faq-item__icon" aria-hidden>+</span>
                            </button>
                            <div id={`faq-answer-${index}`} className="faq-item__answer" role="region" aria-labelledby={`faq-question-${index}`}>
                                <p className="mb-0">{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export { Faq };
