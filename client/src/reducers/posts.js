//what are reducers?
/* its a function
    a function that accepts the state, and action, and based on the action type, misal equal to create then we do some logic, returning either action or state changed by action, usually many if statement or switch

    in reducers, state must always eq to sth, gblh bolong
    our post is gonna be an array makanya state=[], tpi to make things simpler cuz our state is always gonna be our post jdi kita ganti nama state jdi post
*/
import { FETCH_ALL, CREATE, DELETE, UPDATE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {

        case DELETE: //(12) came from actions
            return posts.filter((post) => post._id !== action.payload);
            //return all post but filter the one we delete, keep all post except the one where id is eq to action.payload
            //so then go to inside post.js and dispatch the action
        
        case UPDATE:   //implement case of update(8)
        case LIKE: //sama persis kyk update so skalian
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
            //map output is an array, so we mapping the post array, changing sth in there then return the changedd arr
            //action.payload is the updated post
            //the ternary stmnt just means klo keganti, kita ganti jd the newest one if not then no change

        case FETCH_ALL: // fetching all post
            return action.payload;  //action.payload is our post // this was a lot of redux data passing

        case CREATE:  //when create wanna send an array of posts by spreading and add a new post by action.payload
            return [...posts, action.payload];

        default:
            return posts;
    }

}