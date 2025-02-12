export default function Showimg({ items,like }) {
    return (<>
        <div id="testtest" class="carousel slide" data-bs-ride="carousel">
            {like&&like.length>0 ? <><div className="c-card-number">{like.length}</div><i className="bi bi-heart-fill fs-2 text-primary c-card-icon"></i></> : <></>}
            <div className="carousel-indicators">
                {items[1] ? items.map((image, i) => (
                    <button
                        key={i}
                        type="button"
                        data-bs-target="#testtest"
                        data-bs-slide-to={i}
                        className={i === 0 ? "active" : ""}
                        aria-current={i === 0 ? "true" : "false"}
                        aria-label={`Slide ${i + 1}`}
                    ></button>
                )):<div className="d-none"></div>}
            </div>
            <div className="carousel-inner">
                {items.map((item, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? "active c-item" : "c-item"}`}>
                        <img src={item} alt={`art`} className="d-block w-100 c-img" />
                    </div>
                ))}
            </div>
            {items[1] ?<>
            <button class="carousel-control-prev " type="button" data-bs-target="#testtest" data-bs-slide="prev">
                <span class="carousel-control-prev-icon " ></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#testtest" data-bs-slide="next">
                <span class="carousel-control-next-icon" ></span>
                <span class="visually-hidden">Next</span>
            </button>
            </> : <div className="d-none"></div>}
        </div>
    </>);
}