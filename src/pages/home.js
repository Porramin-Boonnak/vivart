import "../pagescss/Home.css"
import Searchbar from "../component/searchbar";
import { FaBahtSign } from "react-icons/fa6";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Home() {
    const navavigate = useNavigate();
    const [post,setpost] = useState([]);
    useEffect(() => {
        axios.get("https://se-servise.azurewebsites.net/post")
            .then(response => setpost(response.data))
            .catch(error => console.error("There was an error!", error));
    }, []);
    const handleclick =(id)=>{
        navavigate(`/post/${id}`);
    }
    const Allpictures = ({ items }) => {
        return (
            <div className="masonry-layout">
                {items.map((item) => (
                    <div className="masonry-item">
                        <div className="card" onClick={()=>handleclick(item._id)}>
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
                <Allpictures items={post} />
            </div>
        </div>
    </>)
}