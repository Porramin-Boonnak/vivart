import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const post_notificate = async (post_id, sender , receiver, stage_noti, post_msg, descript) => {
  console.log(post_id, sender , receiver, stage_noti, post_msg, descript)
    const date = new Date();
    const formattedDate = date.toLocaleString('sv-SE', { timeZone: 'Asia/Bangkok' }).replace(' ', 'T').slice(0, 16);
    try {
        const response = await axios.post(`${API_URL}/notificate`, {
            post_id,
            sender,
            receiver,
            stage_noti,
            post_msg,
            descript,
            time:  formattedDate
        });
    } catch (error) {
        // setMessage("Error: " + (error.response ? error.response.data.message : "Unable to connect to the server"));
    }
};

const messageFromEachStage = ( data , stage_noti) => {
   
      if (stage_noti == "11") {
        return data.sender + " Like Your Post" + data.post_msg
      }
      if (stage_noti == "12") {
        return data.sender + " comment on your post \"" + data.post_msg + "\" \n\"" + data.descript + "\""
      }
      if (stage_noti == "13") {
        return data.sender + " is Followed you "
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
        return data.sender + " Buy your Product " + data.post_msg
      }
      if (stage_noti == "32") {
        return data.sender + " bid your post to " + data.descript + " Baht." //descript = ราคา
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
        return "/post/"+data.post_id
  }
  if (stage_noti == "12") {
        return "/post/"+data.post_id
  }
  if (stage_noti == "12") {
    return "/profile/"+data.sender
}
  if (stage_noti == "21") {
    return "/paidHistory"
  }
  if (stage_noti == "22") {
    return "/Toship"
  }
  if (stage_noti == "23") {
    return "/Toship"
  }
  if (stage_noti == "24") {
    return "/Toship"
  }
  if (stage_noti == "25") {
    return "/shipping"
  }
  if (stage_noti == "26") {
    return "/cart"
  }
  if (stage_noti == "27") {
    return "/cart"
  }
  if (stage_noti == "31") {
    return "/salehistory"
  }
  if (stage_noti == "32") {
    return "/selling"
  }
  if (stage_noti == "33") {
    return "/choose"
  }
  if (stage_noti == "34") {
    return ""
  }
  if (stage_noti == "35") {
    return "/salehistory"
  }

}

const IconFromEachStage = (data , stage_noti) =>{
 if (stage_noti == "11") {
        return "👍"
      }
      if (stage_noti == "12") {
        return "💬"
      }
      if (stage_noti == "13") {
        return "💞"
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
        return "⚠️"
      }
      if (stage_noti == "26") {
        return "❌"
      }
      if (stage_noti == "27") {
        return "🍀"
      }
      if (stage_noti == "31") {
        return "🏷️"
      }
      if (stage_noti == "32") {
        return "🙋"
      }
      if (stage_noti == "33") {
        return "⌛"
      }
      if (stage_noti == "34") {
        return "🕑"
      }
      if (stage_noti == "35") {
        return "✅"
      }
}

const LikeFromHomePage = ({ post_id, loginUser }) => {
  useEffect(() => {
    console.log(post_id)
    axios.get(`${API_URL}/post/${post_id}`)
      .then(response => {
        console.log(response.data)
        post_notificate(
          response.data._id,
          loginUser,
          response.data.own,
          "11",
          response.data.name,
          ""
        );
      })
      .catch(error => console.error("Error fetching data:", error));
  }, [post_id, loginUser]);

  return null; // or some JSX component
};



export { post_notificate , messageFromEachStage , PathFromEachStage , IconFromEachStage , LikeFromHomePage};