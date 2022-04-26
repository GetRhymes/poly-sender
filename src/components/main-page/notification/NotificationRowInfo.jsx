import React from "react";

function NotificationRowInfo({leftText, rightText}) {
    return (
        <div className="notification__row">
            <p className="notification__row__left">{leftText}</p>
            <p className="notification__row__right">{rightText}</p>
        </div>
    );
}

export default NotificationRowInfo;