const API_URL = process.env.REACT_APP_API_URL;
const post_notificate = async (post_id, sender , receiver, stage_noti, post_msg, descript) => {
    try {
        const response = await axios.post(`${API_URL}/notificate`, {
            post_id,
            sender,
            receiver,
            stage_noti,
            post_msg,
            descript,
            time: new Date().toISOString()
        });
    } catch (error) {
        setMessage("Error: " + (error.response ? error.response.data.message : "Unable to connect to the server"));
    }
};

/* 
call
import { post_notificate } from './path_to_your_file';

//Like post
post_notificate(
    "post_id", 
    "login_user",
    "receiver",
    "11":,
    "post.msg",
    "Like your post"
);

//Comment
post_notificate(
    "post_id", 
    "login_user",
    "receiver",
    "11":,
    "post.msg",
    "Comment on your post"
);

//Comment
post_notificate(
    "post_id", 
    "login_user",
    "receiver",
    "11":,
    "post.msg",
    "Comment on your post"
);


*/


export { post_notificate };