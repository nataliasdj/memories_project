//implement calls to api

import axios from 'axios';  //to make api calls

//url pointing to backend route
const url = 'https://memoriesproject2021.herokuapp.com/posts';  //this simply returns all the psot we hav in db

export const fetchPosts = () => axios.get(url);

// all actions towards backend are done using redux, we need to dispatch those actions

export const createPost = (newPost) => axios.post(url, newPost); //exported sth from action

export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);


//(8)since actions use API kita kesini, so now we got to actions abis tambahin the api

//(12) dri controller posts kita kesini
export const deletePost = (id) => axios.delete(`${url}/${id}`);
//then go to actions (12)

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);