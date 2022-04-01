import React from 'react';
import '../styles/Profile.css'

const Profile = () => {

    return (
        <div className="profile__container">
            <div className="profile__body__block profile__background">
                <div className="profile__avatar">
                    <p className="profile__avatar__text">NT</p>
                </div>
                <p className="profile__text text__name">Tarasenko Nikita Sergeevich</p>
                <p className="profile__text text__mail">tarasenko.ns@edu.spbstu.ru</p>
            </div>
        </div>
    );
};

export default Profile;
