import "../../../pagescss/Home.css";
import { FaBahtSign } from "react-icons/fa6";
import uniq from "../../../pictures/uniq.png";
import view from "../../../pictures/view.png";

export default function Pic_Card({
    posts = [],
    likedItems = {},
    username,
    toggleLike,
    handleClick
}) {
    return (
        <div className="masonry-layout">
            {posts.map((item) => {
                const isLiked =
                    likedItems[item._id] ??
                    (Array.isArray(item.like) && item.like.some((element) => element.username === username));

                return (
                    <div className="masonry-item" key={item._id}>
                        <div className="card">
                            <div>
                                <i
                                    className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"} text-primary c-card-icon`}
                                    style={{ fontSize: "1.2rem" }} // ลดขนาดไอคอน
                                    onDoubleClick={() => toggleLike(item._id, isLiked)}
                                ></i>

                            </div>
                            <img
                                onClick={() => handleClick(item._id)}
                                src={!Array.isArray(item.img) ? item.img : item.img[0]}
                                className="card-img-top"
                                alt={item.name || "Image"}
                            />
                            <div className="like-bottom-right">
                                <div className="like-number">{item.like?.length || 0}</div>
                                <div className="like-text">Likes</div>
                            </div>
                            <div className="card-body" onClick={() => handleClick(item._id)}>
                                <h2 className="card-title">{item.name}</h2>
                                <div className="card-details">
                                    <div className="card-user">
                                        <h5>{item.artist}</h5>
                                        <div className="card-view-container">
                                            {item.visit ? (
                                                <div className="c-card-view">
                                                    <img src={view} alt="view" className="view-icon" />
                                                    {item.visit}
                                                </div>
                                            ) : null}
                                        </div>
                                        {item.typepost !== "normal" && (
                                            <h5 className="text-primary fw-bold">
                                                <FaBahtSign />
                                                {item.price}
                                                {item.typepost === "uniq" && (
                                                    <img src={uniq} alt="uniq" className="uniq-image" />
                                                )}
                                            </h5>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
