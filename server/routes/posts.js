import { Router } from "express";
import express from 'express';

import { getPosts, createPost, updatePost, deletePost, likePost} from '../controllers/posts.js'
//ada {} cuz its named and not defaul export

const router = express.Router(); // setting up the router

//start add route

// (1) we'll get repsonse if go to http://localhost/5000/posts not localhost/5000/ when looking at '/' - hrs ada prefix

router.get('/', getPosts); //path is '/' dash mskdnya and specify callback func when someone visit local host 5000
router.post('/', createPost); 
router.patch('/:id', updatePost);//updating existing doc, perlu id cuz we edit, so need id, updatePost is like calling the new function

router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost); //why patch, technically is like update jg

//REMEMBER abis kesini ke controller

export default router;

