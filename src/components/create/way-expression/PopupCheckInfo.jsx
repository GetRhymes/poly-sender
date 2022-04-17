import React from 'react';
import '../../../styles/Create.css'
import Divider from "@mui/material/Divider";

function PopupCheckInfo({active, setPopupActive}) {

    return (
        <div className={active ? "popup active" : "popup" } onClick={() => setPopupActive(false)}>
            <div className="popup__content">
                <p className="popup__label">Справка</p>
                <p className="about__text success">Successful! - Выражение корректно</p>
                <Divider/>
                <p className="about__text warning">Warning! - Выражение корректно, но не имеет смысла</p>
                <Divider/>
                <p className="about__text error ">Error! - Выражение некорректно</p>
                <Divider/>
            </div>
        </div>
    );
}

export default PopupCheckInfo;