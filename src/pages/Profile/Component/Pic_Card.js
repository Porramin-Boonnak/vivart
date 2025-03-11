import "../../../pagescss/Pic_Card.css";

export default function Pic_Card({ posts }) {
    return (
        <div className="container-fluid px-5 mt-4"> 
            <div className="masonry-layout">
                {(posts || []).map((post, index) => (
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
                ))}
            </div>
        </div>
    );
}
