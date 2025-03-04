import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import TuuImage from "../../pictures/Tuu.jpg";
import { useNavigate } from "react-router-dom";

export default function Salehistory() {
    const navigate = useNavigate();

    const forsellerclick= () =>{
        navigate("/forseller");
    };

    const products = [
        { id: 1, name: "Light star", image: TuuImage, stock: 50, price: 7000, buyer: "Jamal" },
        { id: 2, name: "Reach star", image: TuuImage, stock: 35, price: 10000, buyer: "Winter" },
        { id: 3, name: "Hidden moon", image: TuuImage, stock: 42, price: 999, buyer: "Tuu lover" },
    ];

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100">
            <div className="row">
                <Navbar />
            </div>

            <div className="row bg-secondary">
                <div className="d-flex justify-content-center justify-content-md-between">
                    <div className="fs-1 mt-5 ms-5 d-none d-md-block">Sale history</div>
                    <div className="d-flex justify-content-center align-items-center mt-5 me-5">
                        <input
                            className="form-control rounded-pill rounded-end-0 w-75 d-inline-block cs-color-Search border-end-0 border border-dark"
                            type="search"
                            placeholder="Searching"
                            aria-label="Search"
                        />
                        <button type="button" className="btn rounded-pill rounded-start-0 cs-color-btn-Search  border-start-0 border border-dark">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {products.map((product) => (
                        <div key={product.id} className="d-flex flex-wrap justify-content-between align-items-center bg-white p-3 my-2 rounded">
                            {/* pic next to name */}
                            <div className="d-flex flex-column align-items-start me-3">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="me-3"
                                        style={{ width: "50px", height: "50px" }}
                                    />
                                    <div className="fs-4 fw-bold">{product.name}</div>
                                </div>
                                <div className="text-muted">Buyer : {product.buyer}</div>
                            </div>

                            <div className="d-flex flex-column me-3">
                                <div>Sold date: 24/01/2025</div>
                                <div>Pieces: 5</div>
                            </div>

                            <div className="d-flex flex-column ms-3">
                                <div className="text-muted">Price</div>
                                <div className="fw-bold text-primary">{product.price.toLocaleString()} baht</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row bg-secondary py-4">
                <div className="d-flex justify-content-center">
                    <button className="fs-1 text-primary btn" onClick={forsellerclick}>
                        <IoReturnUpBackOutline className="fs-1 text-primary" /> Back
                    </button>
                </div>
            </div>
        </div>
    );
}
