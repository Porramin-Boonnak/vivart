const API_URL = process.env.REACT_APP_API_URL;


const post_notificate = async (post_id, sender , reciever, stage_noti, post_msg, descript) => {
    try {
        const response = await axios.post(`${API_URL}/notificate`, {
            post_id,
            sender,
            reciever,
            stage_noti,
            post_msg,
            descript,
            time: new Date().toISOString()
        });
    } catch (error) {
        setMessage("Error: " + (error.response ? error.response.data.message : "Unable to connect to the server"));
    }
};


export { post_notificate };