//model for our POST
import mongoose from "mongoose";

/*create mongoose schema
isinya is object in that schema func
    Schema is gives uniformity to docs - cuz docs bs ada banyak misal in mongodb ada title + message, others cuman message, so each post hrs ada bla bla bla, which is the object
*/
const postSchema = mongoose.Schema({
    title: String,
    message: String, 
    creator: String,
    tags: [String],
    selectedFile: String, //convert img to string with base64
    likeCount: {
        type: Number,
        default: 0  // gk mau lgsg likeCount: num cuz mau kasih defaultnya itu 0
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

//with the schema we then turn it into a model
const PostMessage = mongoose.model('PostMessage', postSchema); //PostMessagenya hrs sama ya

export default PostMessage; //export mongooose model from postmessage file so on model kita bs find create delete update