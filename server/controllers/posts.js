/*folder structure for backend application -better scalable
     put all handlers for our routes
     gk mau susah liat routes with all the logic and requests
     so we extract all the func / logic and put here
*/
import mongoose from 'mongoose';
import PostMessage from "../models/postMessage.js"; //gives access to our real model

//ALWAYS have request and response for all callback inside router.get
export const getPosts = async (req,res) => { 
    //res.send('THIS WORKS!');  //just for reference tdinya to see at port 5000 did it work?
    try{
        //try to retreive all post in db
        /*const postMessages = PostMessage.find(); 
            incorrect since find sth inside model takes time - meaning its async action so hrs begini
        */
        const postMessages = await PostMessage.find();       
        res.status(200).json(postMessages);//func must return sth - just say is good klo 200

    } catch(error){
        res.status(404).json({message: error.message});
    }
}

//adding diff post
export const createPost = async(req,res) => { 
    //post request ada access to request.body
    const post = req.body; //we need a way to send post req, ini hrs dri client side - create form and layout biar bs bikin post

    const newPost = new PostMessage(post);

    try{
        /**/
        await newPost.save();
        res.status(201).json(newPost); //successful creation

    } catch(error){
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req, res) => {
    //extract the id from the param, we set our route to be :id kan, also basically we just rename our property to be _id
    const { id: _id } = req.params;
    const post = req.body; // the updated post - sent from frontend

    //check if the _id is a mongoose object id (validity)
    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    //if id is valid = then update the post
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id}, { new: true}); 
    //to create new object jdi the post itself ada id jg, soalnya biasa we were just updating the post by telling the title, message but never the id, so we spread all the property from an object from the frontend and pass in the _id
    //new:true biar kita bs actually receive the updated post

    res.json(updatedPost); //send over the updated post

    //now go to client for same logic, in the components/form (6)

}

export const deletePost = async (req, res) => {
    const { id } = req.params; //get the id

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    //implement logic to delete it
    await PostMessage.findByIdAndRemove(id);

    res.json( {message: 'Post deleted succesfully'});
    //now with route, intiatie it, go to api (12)
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id); //this returns a post

    const updatedPost = await PostMessage.findByIdAndUpdate(id, {likeCount: post.likeCount + 1}, {new: true} ) //this post is the post we fetched in the previous const post, also now is the updated post

    res.json(updatedPost);
}
