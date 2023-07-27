import React from 'react';
// import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';


const theme = createTheme({
    palette: {
        primary: {
            main: '#8B0000',
        },
        secondary: {
            main: '#FF0000',
        },
    },
});

const LoadingBar = () => {

    let top = "";
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    if(path === "categories"){
        top= "120px"
    }else{
        top= "80px"
    }

    return (
        <div style={{position: "fixed", top: top, width: "100%"}}>
            <ThemeProvider theme={theme}>
                <LinearProgress color="primary" />
            </ThemeProvider>
        {/* npm install @mui/material @emotion/react @emotion/styled */} 
        </div>
    )
}

export default LoadingBar