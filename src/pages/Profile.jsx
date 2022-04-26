import React, {useContext, useEffect} from 'react';
import '../styles/Profile.css'
import {PathContext} from "../context";
import {useStateIfMounted} from "use-state-if-mounted";

const Profile = () => {

    const {setRootPath} = useContext(PathContext)

    const [email, setEmail] = useStateIfMounted(localStorage.getItem('email'))
    const [fullName, setFullName] = useStateIfMounted(localStorage.getItem('fullName'))
    const [roles, setRoles] = useStateIfMounted(() => {
        const roles = localStorage.getItem('roles')
        if (roles) return roles.split(',')
        else return []
    })

    useEffect(() => {
        setRootPath("Профиль")
        return (() => {
            setRootPath("")
        })
    })

    return (
        <div className="profile__container">
            <div className="profile__body__block profile__background">
                <div className="profile__avatar">
                    <p className="profile__avatar__text">{getAvatarByName(fullName)}</p>
                </div>
                <p className="profile__text text__name">{fullName}</p>
                <p className="profile__text text__mail">{email}</p>
                {
                    roles.map((role)=>
                        <p key={role} className="profile__text text__mail">{getRoleNameByRole(role)}</p>
                    )
                }
            </div>
        </div>
    );
};

function getAvatarByName(fullName) {
    const fn = fullName.split(' ')
    return fn[0][0] + fn[1][0]
}

function getRoleNameByRole(role) {
    if (role === null) return 'Нет роли'
    if (role === 'USER') return 'Пользователь'
    if (role === 'ADMIN') return 'Администратор'
}

export default Profile;
