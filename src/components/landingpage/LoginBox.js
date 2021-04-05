import { Box, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import React from 'react';
import { borders } from '@material-ui/system';
import { Link } from 'gatsby';
import Image from '../../images/logo.svg';


const LoginBox=()=>{
    const loginBoxStyle={padding :20, 
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

    const logoStyle={
        marginLeft:"30px",
        marginTop:"30px"
    }
    
    return(
        <Grid container>
            <Paper style={loginBoxStyle}>
            <img src={Image} style={logoStyle}></img>
                <Grid container style={formStyle}>
                    <Typography variant="h3" style={h3Style}>Log in</Typography>
                    <Typography variant="body2" style={body2Style}>Already have an account? Log in with your email below.</Typography>
                    <Box border={1} borderRadius="borderRadius" borderColor="grey.300" style={boxStyle}>
                        <TextField id="email" placeholder="Email" style={textFieldStyle}></TextField>
                        <TextField id="pw" placeholder="Password" style={textFieldStyle}></TextField>
                        <Link to="/home/" style={{ textDecoration: 'none' }}><Button variant="contained" style={loginButtonStyle}>Log in</Button></Link>
                    </Box>
                </Grid>            
            </Paper>
        </Grid>
    )
}

export default LoginBox;