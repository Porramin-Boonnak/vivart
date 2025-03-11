import "../../../pagescss/Pic_Card.css";

export default function Pic_Card({ posts }) {
    return (
        <div className="container-fluid px-5 mt-4"> 
            <div className="masonry-layout">
                {(posts || []).map((post, index) => (
<<<<<<< HEAD
                    <div key={index} className="masonry-item">
                        <div className="card">
                            <img 
                                src={post.img} 
                                alt={post.name} 
                                className="card-img-top" 
                            />
                            <div className="card-body text-left">
                                <h5 className="card-title">{post.name}</h5>
                                <p className="card-text d-inline">{post.post || "No comment provided."}</p>
                            </div>
                        </div>
                    </div>
=======
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card" style={{ height: "100%", position: "relative" }}>
                            <i
                                className="fa fa-cash position-absolute"
                                style={{ fontSize: "40px", color: "white", top: "10px", right: "10px", zIndex: 10 }}
                            >HEKKI</i>
                            <img
                                src={post.img}
                                className="card-img-top"
                                alt={post.name}
                                style={{ height: "250px", objectFit: "cover" }}
                            />

                            <div className="card-body">
                                <h5 className="card-title">{post.name}</h5>
                                <p className="card-text">{post.post || "No comment provided."}</p>
                            </div>
                        </div>
                    </div>

>>>>>>> e69af6cbb3d9fb9a7cf6e0a95f9b976222196eca
                ))}
            </div>
        </div>
    );
}
