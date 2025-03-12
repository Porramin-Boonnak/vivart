
import axios from 'axios';


const post_notificate = async (post_id, sender , receiver, stage_noti, post_msg, descript) => {
    const API_URL = process.env.REACT_APP_API_URL;
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
        // setMessage("Error: " + (error.response ? error.response.data.message : "Unable to connect to the server"));
    }
};

const messageFromEachStage = ( data , stage_noti) => {
      console.log(data)
      if (stage_noti == "11") {
        return data.sender + " Like Your Post" + data.post_msg
      }
      if (stage_noti == "12") {
        return data.sender + " comment on your post" + data.post_msg + "\n\"" + data.descript
      }
      if (stage_noti == "21") {
        return data.descript + " Your payment for order " + data.post_msg + "is complete."
      }
      if (stage_noti == "22") {
        return data.descript + " Your artist is packing your order " + data.post_msg + "."
      }
      if (stage_noti == "23") {
        return data.descript + " Your order " + data.post_msg + "is shipping."
      }
      if (stage_noti == "24") {
        return data.descript + " Your shipment for order " + data.post_msg + "has arrived." + "\n\"" + "at" + data.time
      }
      if (stage_noti == "25") {
        return data.descript + " Please pay your order" + data.post_msg + "within 24 hours or it will be canceled."
      }
      if (stage_noti == "26") {
        return data.descript + " Your order" + data.post_msg + "has been canceled." + "\n\"" + "due to your late payment."
      }
      if (stage_noti == "27") {
        return data.sender + " Congratulation! you won the bid." + "\n\"" + "Please check your cart to continue payment."
      }
      if (stage_noti == "31") {
        return data.descript + " Your product has been sold."
      }
      if (stage_noti == "32") {
        return data.sender + " bid your post to" + data.descript + "Baht." //descript = ราคา
      }
      if (stage_noti == "33") {
        return data.descript + " Your bid post timeout in 1 hour."
      }
      if (stage_noti == "34") {
        return data.descript + " Your bid post is timeout." + "\n\"" + "Please select the person to sell."
      }
      if (stage_noti == "35") {
        return data.descript + " The buyer has succesfully paid."
      }
}


const PathFromEachStage = (data , stage_noti) =>{

  if (stage_noti == "11") {
        return "post/"+data.post_id
  }
  if (stage_noti == "12") {
        return "post/"+data.post_id
  }
  if (stage_noti == "21") {
    return data.descript + " Your payment for order " + data.post_msg + "is complete."
  }
  if (stage_noti == "22") {
    return data.descript + " Your artist is packing your order " + data.post_msg + "."
  }
  if (stage_noti == "23") {
    return data.descript + " Your order " + data.post_msg + "is shipping."
  }
  if (stage_noti == "24") {
    return data.descript + " Your shipment for order " + data.post_msg + "has arrived." + "\n\"" + "at" + data.time
  }
  if (stage_noti == "25") {
    return data.descript + " Please pay your order" + data.post_msg + "within 24 hours or it will be canceled."
  }
  if (stage_noti == "26") {
    return data.descript + " Your order" + data.post_msg + "has been canceled." + "\n\"" + "due to your late payment."
  }
  if (stage_noti == "27") {
    return data.sender + " Congratulation! you won the bid." + "\n\"" + "Please check your cart to continue payment."
  }
  if (stage_noti == "31") {
    return data.descript + " Your product has been sold."
  }
  if (stage_noti == "32") {
    return data.sender + " bid your post to" + data.descript + "Baht." //descript = ราคา
  }
  if (stage_noti == "33") {
    return data.descript + " Your bid post timeout in 1 hour."
  }
  if (stage_noti == "34") {
    return data.descript + " Your bid post is timeout." + "\n\"" + "Please select the person to sell."
  }
  if (stage_noti == "35") {
    return data.descript + " The buyer has succesfully paid."
  }

}

const IconFromEachStage = (data , stage_noti) =>{
 if (stage_noti == "11") {
        return "👍"
      }
      if (stage_noti == "12") {
        return "💬"
      }
      if (stage_noti == "21") {
        return "💸"
      }
      if (stage_noti == "22") {
        return "📦"
      }
      if (stage_noti == "23") {
        return "🚚"
      }
      if (stage_noti == "24") {
        return "📦✔"
      }
      if (stage_noti == "25") {
        return "⚠"
      }
      if (stage_noti == "26") {
        return data.descript + " Your order" + data.post_msg + "has been canceled." + "\n\"" + "due to your late payment."
      }
      if (stage_noti == "27") {
        return data.sender + " Congratulation! you won the bid." + "\n\"" + "Please check your cart to continue payment."
      }
      if (stage_noti == "31") {
        return data.descript + " Your product has been sold."
      }
      if (stage_noti == "32") {
        return data.sender + " bid your post to" + data.descript + "Baht." //descript = ราคา
      }
      if (stage_noti == "33") {
        return data.descript + " Your bid post timeout in 1 hour."
      }
      if (stage_noti == "34") {
        return data.descript + " Your bid post is timeout." + "\n\"" + "Please select the person to sell."
      }
      if (stage_noti == "35") {
        return data.descript + " The buyer has succesfully paid."
      }
}
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


export { post_notificate , messageFromEachStage , PathFromEachStage , IconFromEachStage};