//where to dispatch the action? is inside useEffect
import React, { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';  // dispatch the get post action - this allows us to dispatch an action

import { getPosts } from './actions/posts';
import Posts from './components/Posts/Posts';//import the previous exported components yg tdi post bla bla
import Form from './components/Form/Form';
import memories from './images/memories.png';

import useStyles from './styles';   //knp namanya useStyle, itu yg lu mau pake in this current file
/*
container to centre things
grow : simple animation
*/

// (7)keep track of curr id, knp in app.js, we share state of curr id in post and form and app.js is both parent of post and form

const App = () => {
    const [currentId, setCurrentId] = useState(null);   //null klo no id selected
    const classes = useStyles();
    const dispatch = useDispatch();

    // has component that mounds(?) and component we'll update
    // this is out successfull dispatch
    // kan we need to export getPosts from the action
    useEffect(() => {
        dispatch(getPosts()); //use dispatch to dispatch an action - action is like getPost bla bla
    }, [currentId, dispatch]); //1st param is callback, 2nd array
    //(11) why use currId, since we cleared the input changing the currId, so the App will dispathc the getPost action thus making change getting the new

    return(
        <Container maxwidth = "lg">
            {/* namanya classes. bla itu sama yg kyk di styles component, coba buka components/index.js */}
            <AppBar className={classes.appBar} position = "static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60"/>
            </AppBar>
            <Grow in>
                <Container>
                    {/* grid type container, can add 2 diff grid item */}
                    <Grid className={classes.smallContainer} container justify="space-between" alignItems="stretch" spacing={3}>

                        {/* means it takes full width on extra small devices, if small or med it will take 7/12 spaces on small or med devices */}
                        <Grid item xs={12} sm={7}>
                            {/*inside is our post component-yg the file we made blm create or import component */}
                            <Posts setCurrentId={setCurrentId}/> 
                            {/* pass setter method of id both in post and to form (seetCurrId) */}
                        </Grid>
                        
                        <Grid item xs={12} sm={4}>
                            <Form currentId={currentId} setCurrentId={setCurrentId}/> 
                            {/* pass currId to form */}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>

        </Container>
    )
};

export default App;

