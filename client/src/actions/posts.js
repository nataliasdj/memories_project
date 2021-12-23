//since we are fetching all post dri sini 
//fetching data from api, then send data (payload:data) thru action.payload

import { FETCH_ALL, CREATE, DELETE, UPDATE, LIKE } from '../constants/actionTypes';
import * as api from '../api';  //import * as means importing everything from the action as api
//makanya bs pake fetchpost from api, ex like api.fetchPosts


//bcs we imported the action getPosts in App.js , we export here
//Action creators - which are functions that return action
export const getPosts = () => async(dispatch) => {

    //try to fetch all data in api
    try {
        const { data } = await api.fetchPosts(); // response is the data basically
        //we are getting the response from the api then, in the response we have the data object which we are returning from backend, so we get the data, so 
        //BASICALLY the data represents the post
        

        //so we can just dispatch an action //payload is usually data we store all posts
        dispatch({ type: FETCH_ALL, payload: data });

        //so we used redux to pass or dispatch an action from the data form backend
        
    } catch (error) {
        console.log(error.message);
    }
}
// so we have succesfully action creator
//problem: we work w/ async data, to fetch all post in payload some time will pass so makanya we use redux-thunk makanya ada double arrow asyn bla bla and instead of returning the action just dispatch it gara2 redux thunk

export const createPost = (post) => async(dispatch) => {
    try {
        const { data } = await api.createPost(post);    //get the data
        //making a post api req to our backend server and we are sending a post there
        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }

}
//as we need to dispatch the action go to form (4)


//(8) from api yg paling pertama dari forms
export const updatePost = (id, post) => async(dispatch) => {
    try {   //api request to update the post, this return the updated memory/post
        const {data} = await api.updatePost(id, post);

        dispatch({ type: UPDATE, payload: data});
    } catch (error) {
        console.log(error);
    }
}
//abis action we go to reducers (8)

//(12) from api
export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id); // we not interested in return data makanya no const response stuff

        dispatch( {type: DELETE, payload: id}); //id we wanna delete
    } catch (error) {
        console.log(error);
    }
}
//after we create an action we go to the reducers(12)


export const likePost = (id) => async (dispatch) => {
    try {
        const {data} = await api.likePost(id);  //since we just have to like it, no need the post

        dispatch({ type: LIKE, payload: data});
    } catch (error) {
        console.log(error);
    }
}

