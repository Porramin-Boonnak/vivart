import "../pagescss/Home.css"
import Searchbar from "../component/searchbar";
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
            <Searchbar/>
            <div className="row bg-secondary p-3">
                <Allpictures items={example} />
            </div>
        </div>
    </>)
}