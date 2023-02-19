import React from 'react';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import "./index.css";
import aegis from "./AegisLogo.png";

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
                <br/>
                <br/>
                <div className='homePage'>
                    <img src={aegis}></img>
                    <h1>Welcome to Aegis Finance - Prototype Demo.</h1>
                    <h3>Fast and Transparent Payment Flows, in Good Hands.</h3>
                    <br/>
                    <br/>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => { navigate('/employee') }}
                        style={{
                            display: "block",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >User Portal Login</Button>
                    <br />
                    <br />
                    {/* <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => { navigate('/organization') }}
                    >Organization View</Button> */}
                </div>
            </ThemeProvider>
        </>
    )
}


export default Home;