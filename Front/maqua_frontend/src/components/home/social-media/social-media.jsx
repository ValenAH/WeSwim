import React from "react";
import './social-media.scss';
import {BsWhatsapp, BsInstagram, BsFacebook} from 'react-icons/bs';

const SocialMedia = () => {

    return (
        <div className="socialMedia py-5">
            <div className="container-fluid">
                <div className="container">
                    <div className="d-flex justify-content-around text-light">
                        <div className="d-flex gap-2 align-items-center">
                            <BsWhatsapp className="icons"/>
                            <span>+57 3052587069</span>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <BsInstagram className="icons"/>
                            <span>@maqua.oficial</span>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <BsFacebook className="icons"/>
                            <span>Maqua Gimnasia Acuática</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export {SocialMedia}