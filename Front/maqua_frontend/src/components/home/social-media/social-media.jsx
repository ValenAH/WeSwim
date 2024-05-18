import React from "react";
import './social-media.scss';
import {BsWhatsapp, BsInstagram, BsFacebook} from 'react-icons/bs';

const SocialMedia = () => {

    return (
        <div className="socialMedia py-3">
            <div className="container-fluid">
                <div className="container">
                    <div className="d-lg-flex justify-content-around text-light">
                        <div className="d-flex gap-2 align-items-center">
                            <BsWhatsapp className="icons"/>
                            <a className="text-white" href="https://wa.me/573052587069" target="_blank">+57 3052587069</a>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <BsInstagram className="icons"/>
                            <a className="text-white" href="https://www.instagram.com/maqua.oficial/" target="_blank">@maqua.oficial</a>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <BsFacebook className="icons"/>
                            <a className="text-white" href="https://m.facebook.com/people/MAQUA/100064239030294/" target="_blank">Maqua Gimnasia Acuática</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {SocialMedia}