//component for post
//how to retrieve data from within component
// have to somehow fetch data from global redux store with help of selector
// ini dri component trus lgsg ke POSTS


import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { selector, useSelector } from 'react-redux';

import Post from './Post/Post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    //whole global redux store aka state
    //kok tau namanya posts? in the reducers in index.js we exported the post thing (3)
    //(10) fetching a post or old post
    const posts = useSelector((state) => state.posts);
    
    const classes = useStyles();

    return(
        // <> is a react fragment so we can add multiple things in it
       !posts.length ? <CircularProgress /> : (
           <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {/* '//' indicator its javascript logic 
                also we are looping over the post
                */}
                {posts.map((post) => (  //notice its () not {}, we are returning
                   <Grid key={post._id} item xs={12} sm={6} md={6} >
                       <Post post={post} setCurrentId={setCurrentId}/> {/* we are using the post yg kita map i think(send that indiv of a post to each post component), so now we go to the singular post and implement the logic there, yg di dlm Posts/Post/Post.js (5)*/}
                       {/* we also pass setcurrid again bcs we are props drilling, sending the same prop over and over again to most child component, so di post jg hrs tambahin setCurrId */}
                   </Grid> 
                ))}              
           </Grid>
       )
       //if not post.length (or aka if post length is 0 so nothing), show circularprogress aka loading spinner else, grid of our post - kan jdi klo ada length then we show our post
    );
};

export default Posts;
