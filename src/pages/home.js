import "../pagescss/Home.css"
import { Dropdown } from "react-bootstrap";
import { FaBahtSign } from "react-icons/fa6";
export default function Home() {
    const example = [

        { artist: "Sirilux", name: "Paris night", price: 5000, like: true, img: "https://m.media-amazon.com/images/S/pv-target-images/0c9ce4e037546965d6b1f3807e9f8f549a113d32066b2bdb22ada5d179c0d89a.jpg" },
        { artist: "Raweerat", name: "Tree Sky  Flower #Nature", price: 1000, like: false, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHx5joIOaC7qVLEWq4EH2UH8Zcwg6curt6Vg&s" },
        { artist: "Apilak", name: "King of cloth", price: 2000, like: false, img: "https://static0.colliderimages.com/wordpress/wp-content/uploads/sharedimages/2024/04/naruto-shippuden-tv-series-poster.jpg" },
        { artist: "Nonthakan", name: "No holiday", price: 9000, like: true, img: "https://f.ptcdn.info/063/031/000/1430885341-narutoandh-o.jpg" },
        { artist: "Nattapol", name: "Are you out yet?", price: 7000, like: false, img: "https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg" },
        { artist: "Pattamachat", name: "Champ of the champ", price: 4000, like: true, img: "https://i5.walmartimages.com/seo/Naruto-Naruto-Vol-68-Series-68-Paperback-9781421576824_6a1d1fac-c73c-4399-9cee-15140eb90e38.65c1b41f5cd1034c156e214a0d940473.jpeg" },
        { artist: "Porramin", name: "Thailand 4.0", price: 50000, like: false, img: "https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=480,height=720/catalog/crunchyroll/8532171bec0d05bfe45769a330fbab82.jpg" },
        { artist: "Pattamachat", name: "King of cloth", price: 10000, like: false, img: "https://static1.cbrimages.com/wordpress/wp-content/uploads/2023/07/10-huge-problems-naruto.jpg" },
        { artist: "Sirilux", name: "Black window", price: 3000, like: true, img: "https://img.cdn-pictorem.com/uploads/collection/I/IB5PAB9RBI/900_Anime_7_1608090041.5705.jpg" },
        { artist: "Apilak", name: "Champion chips #Food", price: 8000, like: true, img: "https://www.online-station.net/wp-content/uploads/2023/04/narutopoll_featured.jpg" },
        { artist: "Nonthakan", name: "No money", price: 99999, like: false, img: "https://i.kinja-img.com/image/upload/c_fill,h_675,pg_1,q_80,w_1200/78a9f4f099bc1efc26e94269ca2dc46d.jpg" },
        { artist: "Apilak", name: "Nature of art", price: 99999999, like: true, img: "https://narutodiary.wordpress.com/wp-content/uploads/2015/09/1403797397-minato-o.jpg" }

    ];

    const Allpictures = ({ items }) => {
        return (
            <div className="masonry-layout">
                {items.map((item) => (
                    <div className="masonry-item">
                        <div className="card">
                        {item.like ? <i className="bi bi-heart fs-2 text-primary c-card-icon"></i> : <i className="bi bi-heart-fill fs-2 text-primary c-card-icon"></i>}
                            <img src={item.img} className="card-img-top" alt="..." />
                            <div className="card-body">
                                <h2 className="card-title">{item.artist}</h2>
                                <h5 className="d-inline">{item.name}</h5>
                                <div className="d-flex align-items-center justify-content-between ">
                                    <h5 className="text-primary fw-bold"><FaBahtSign />{item.price}</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    return (<>
        <div className="container-fluid p-0">
            <div className="row">
                <div className="col-3 bg-secondary p-2 text-center">
                    <Dropdown>
                        <Dropdown.Toggle className="btn cs-color-btn rounded-pill border border-dark w-25"><div className="d-none d-lg-inline-block">Assets</div></Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown drop="end">
                                <Dropdown.Toggle as="div" className="dropdown-item d-flex align-items-center">
                                    Rarity
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between">
                                        Normal
                                        <i class="bi bi-fullscreen-exit"></i>
                                    </Dropdown.Item>
                                    <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between">
                                        Unique
                                        <i class="bi bi-star-fill"></i>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown drop="end">
                                <Dropdown.Toggle as="div" className="dropdown-item d-flex align-items-center">
                                    Type
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between">
                                        Digital
                                        <i class="bi bi-film"></i>
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between">
                                        Hand draw
                                        <i class="bi bi-palette-fill"></i>
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between">
                                        Sculpture
                                        <i class="bi bi-piggy-bank-fill"></i>
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between">
                                        Painting
                                        <i class="bi bi-brush-fill"></i>
                                    </Dropdown.Item>

                                    <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between">
                                        Photography
                                        <i class="bi bi-image-fill"></i>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className="col-6 bg-secondary p-2 ">
                    <div className="d-flex justify-content-center align-items-center">
                        <input className="form-control rounded-pill rounded-end-0 w-75 d-inline-block cs-color-Search border-end-0 border border-dark" type="search" placeholder="Searching" aria-label="Search" />
                        <button type="button" className="btn rounded-pill rounded-start-0 cs-color-btn-Search  border-start-0 border border-dark"><i class="bi bi-search"></i></button>
                    </div>
                </div>
                <div className="col-3 bg-secondary p-2">
                    <div className="d-flex justify-content-end align-items-center me-5">
                        <button type="button" className="btn btn-secondary"><div className="d-none d-lg-inline-block">Log out</div><i class="bi bi-box-arrow-right ms-2"></i></button>
                    </div>
                </div>
            </div>
            <div className="row bg-secondary p-3">
                <Allpictures items={example} />
            </div>
        </div>
    </>)
}