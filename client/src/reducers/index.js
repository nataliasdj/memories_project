import { combineReducers } from 'redux';

import posts from './posts';    //referring to the one yg di dlm reducers jg
// we are importing this post yg di dlm reducers kesini

export default combineReducers({
    //inside is all the individual reducers we have, in our case, cuman posts
    posts, // basically setting posts:posts 
    //(3) dpt nama state.posts dri sini
});

//nah makanya kita index.js of reducers is done so go back to the index.js from src (2)