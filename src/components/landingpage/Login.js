import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import LoginBox from './LoginBox';
import Side from './Side';


const Login=()=>{
    return(
        <Grid container>
            <LoginBox></LoginBox>
            <Side></Side>
        </Grid>
        
    )
}

export default Login;