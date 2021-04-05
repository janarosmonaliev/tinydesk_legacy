import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { Link } from 'gatsby';
import React from 'react';
import Home from "../../pages/home";
import Image from '../../images/logo.svg';


const SignUpBox=()=>{
    const signUpBoxStyle={padding :20, 
        height:'100%', 
        width:'54%',
        position:'absolute',
        left:0}
    
    const h3Style={
        marginTop:"20%",
        marginLeft:"3%",
        marginRight:"15%",
        marginBottom:"5px"
    }

    const body2Style={
        marginTop:"15px",
        marginLeft:"3%",
        marginRight:"40%",
        marginBottom:"5%"
    }

    const loginButtonStyle={
        backgroundColor:"#34eb6b",
        color:"#ffffff",
        marginTop:"25px",
        width:"100px"
    }

    const textFieldStyle={
        width:"100%",
        margin:"10px 0px 10px 0px",
        marginLeft:"0px"
    }

    const boxStyle={
        padding:"5%"
    }

    const formStyle={
        width:"50%",
        maxWidth:"500px",
        marginLeft:"25%",
        marginRight:"30%",
        marginTop:"120px",
        marginBottom:"20%"
    }

    const linkStyle={
        margin:"100% 0% 0% 20%",
        marginTop:"px",
        padding:"20px",
        color:"#000"
    }

    const logoStyle={
        marginLeft:"30px",
        marginTop:"30px"
    }
    
    return(
        <Grid container>
                <Paper style={signUpBoxStyle}>
                <img src={Image} style={logoStyle}></img>
                    <Grid container style={formStyle}>
                        <Typography variant="h3" style={h3Style}>Create an account</Typography>
                        <Typography variant="body2" style={body2Style}>Enter your information to create a new account.</Typography>
                        <Box border={1} borderRadius="borderRadius" borderColor="grey.300" style={boxStyle}>
                            <TextField id="name" placeholder="Full name" style={textFieldStyle}></TextField>
                            <TextField id="uname" placeholder="Username" style={textFieldStyle}></TextField>
                            <TextField id="email" placeholder="Email" style={textFieldStyle}></TextField>
                            <TextField id="pw" placeholder="Password" style={textFieldStyle}></TextField>
                            <TextField id="city" placeholder="Current city" style={textFieldStyle}></TextField>
                            <Link to="/home/" style={{ textDecoration: 'none' }}><Button variant="contained" style={loginButtonStyle}>Sign Up</Button></Link>
                            <Link href="#" style={linkStyle} variant="body2">Learn More</Link>
                        </Box>
                    </Grid>  
                </Paper>
            
        </Grid>
    )
}

export default SignUpBox;