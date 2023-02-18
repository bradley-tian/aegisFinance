import React from 'react';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./index.css";

function Home() {

    const navigate = useNavigate();
    const theme = createTheme({
        status: {
            danger: '#e53e3e',
        },
        palette: {
            primary: {
                main: '#0997AB',
            },
            neutral: {
                main: '#000000',
                contrastText: '#ff8a00',
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className='homePage'>
                    <h2>Welcome to Aegis Finance (Prototype Demo).</h2>
                    <h5>Fast and Transparent Cash Flow, All in One.</h5>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => { navigate('/employee') }}
                    >Employee View</Button>
                    <br />
                    <br />
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => { navigate('/organization') }}
                    >Organization View</Button>
                </div>
            </ThemeProvider>
        </>
    )
}


export default Home;