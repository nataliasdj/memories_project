// our POSTS is gonna use the POST component
//so must import our POST to POSTS
// ini component/Posts/Post

//(5) figuring out the singular post logic/each post component

import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { deletePost, likePost } from '../../../actions/posts';    //import action delete

import useStyles from './styles';
const Post = ( {post, setCurrentId} ) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return(
        //start generating the jsc
        <Card className={classes.card}>
            {/* cardmedia is just an image, also kita dpt post dri the one we just passed in pas const post = (...) */}
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creator}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                {/* be abt when post is created, moment....fromNow basically means 5 min ago, 5 seconds ago gitu2*/}
            </div>
            {/* (7) how we edit kan, keep track of curr id (keep track at not only posts.js but also app.js) */}
            <div className={classes.overlay2}>
                <Button style={{color: 'white'}} size="small" onClick={ () => {setCurrentId(post._id)} }>
                    <MoreHorizIcon fontSize="default" />
                </Button>
            </div>

            <div className={classes.details}>
                    {/* loop over our tags and add hashtag before */}
                <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=> `#${tag} `)}</Typography>
            </div>
            <Typography className={classes.title} gutterBottom variant="h5" >{post.title}</Typography>
            <CardContent>
                <Typography gutterBottom variant="body2" color="textSecondary"
                component="p">{post.message}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}>
                    <ThumbUpAltIcon fontSize="small" />
                    Like &nbsp;
                    {post.likeCount}
                </Button>
                {/* Also, nbsp itu code for literally space, cuz it cant be interpreted by jsx klo cuman pencet space (12)dispatch here also see imports to dispatch */}
                <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                    <DeleteIcon fontSize="small" />
                    Delete
                </Button>
            </CardActions>
        </Card>
    );
}

export default Post;


