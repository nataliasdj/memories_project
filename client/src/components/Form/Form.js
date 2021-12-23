// form component
import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import FileBase from 'react-file-base64';

import { useDispatch, useSelector } from 'react-redux'; //(4) for dispatch (10) for selector
import useStyles from './styles';

import { createPost, updatePost } from '../../actions/posts';



//(6) logic from client side when we update a post
//GET curr id of post we are on
// so misal u press edit --> pass id to form component, chnaging the creating a mem to editting a mem, and how we edit aka click on the 3 things in the post component Posts/post/post.js(7)
const Form = ( {currentId, setCurrentId}) => {
    const classes = useStyles();

    //specify the property object is gon start with, mention all property it will hav, selectedfile will be img converted to a str
    const [postData, setPostData] = useState({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    //Now what we wanna do is klo mau edit, kita gk mau isi the title bla bla again kan, cuman the message, by (9) 
    //fetch data from redux like the one at Posts.js tpi klo yg dri sini is old post(10)
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null );
    //finding the specific post aj if not null or no currId, if null then y udh null, so now we have data of current specific post we want to edit
    //now we fetch updated post


    const dispatch = useDispatch(); //now we can dispatch actions
    //where to dispatch, in handle submit

    //2 param, a callback func and a dependency array aka when the callback func should be run, what changes, when post val change then we wanna run the func
    useEffect(() => {
        if(post) setPostData(post);//to populate the form
    }, [post]); 

    //once user submit we send over a post request over with all data user type in
    const handleSubmit = (e) => {
        e.preventDefault(); //prevent default - not to get refresh in browser

        //if curr Id not null we wont dispatch a create post - make sense kan, cuz brarti we are editting
        if(currentId){
            dispatch(updatePost(currentId, postData));
            //if u look at import then thats where we would go to right, but need to go to api since actions are using the api (8)
        } else{dispatch(createPost(postData)); 
            //postData- all data form our state
        }
        clear();
        
    }

    const clear = () => {
        setCurrentId(null);
        setPostData({creator: '', title: '', message: '', tags: '', selectedFile: ''});
    }
    return(
        // paper is like a div with white-ish bg
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a Memory</Typography>
                {/* somehow we added this and suddenly dont have to refresh everytime we edit - maybe cuz we initiated a get post also go to App.js dibilang disono (11)*/}

                {/* whole data crom post is stored in post data object in the state and each object key is a specific text field, creating the state is use the usestate*/}
                <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator}   onChange={(e) => setPostData({ ...postData, creator: e.target.value})} />

                <TextField  name="title" variant="outlined" label="Title" fullWidth value={postData.title}   onChange={(e) => setPostData({ ...postData, title: e.target.value})}/>

                <TextField  name="message" variant="outlined" label="Message" fullWidth value={postData.message}   onChange={(e) => setPostData({ ...postData, message: e.target.value})}/>
                
                <TextField  name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags}   onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})}/>
                {/* //split string by comma and give me array of all tags */}
                 
                {/*  
                    //value is stored in the state, or the in state called post data

                change value of state field with onChange, susah cuz we wanna update just one of the property of the state instead of all  makanya harus ada ...postData, spread the postData gitu lah, so basically klo g ada itu it will only update the value if there is a second field, with the ...postData makanya klo same textfield tpi cuma mau ganti value ok and klo mau 2nd filed y ntar bikin baru
                setPostData is the setter method                   
                */}

                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 }) }/>
                </div>

                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth> Submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>

            </form>
        </Paper>
    );
}

export default Form;