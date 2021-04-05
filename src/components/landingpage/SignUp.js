import { Grid } from '@material-ui/core';
import React, { useState } from 'react'
import SignUpBox from './SignUpBox';
import Side from './Side';


const SignUp=()=>{
    return(
        <Grid container>
            <SignUpBox></SignUpBox>
            <Side></Side>
        </Grid>
        
    )
}

export default SignUp;