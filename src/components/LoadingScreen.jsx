import React from 'react';
import CircularProgress from "@mui/material/CircularProgress";
import '../styles/App.css'

function LoadingScreen() {

    return (
        <div className="loading__screen">
            <CircularProgress/>
        </div>
    );
}

export default LoadingScreen;