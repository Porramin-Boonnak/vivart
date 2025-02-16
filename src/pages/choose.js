import Navbar from "../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import TuuImage from "../pictures/Tuu.jpg";

export default function Choose() {
    const products = [
        { id: 1, name: "Tuu1", image: TuuImage, price: 7000 },
        { id: 2, name: "Tuu2", image: TuuImage, price: 10000 },
        { id: 3, name: "Tuu3", image: TuuImage, price: 999 },
    ];

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100">
            <div className="row">
                <Navbar />
            </div>

            <div className="row bg-secondary">
                <div className="d-flex justify-content-center  justify-content-md-between">
                    <div className="fs-1 mt-5 ms-5 d-none d-md-block">Selling for bid section</div>
                    <div className="d-flex justify-content-center align-items-center mt-5 me-5">
                        <input className="form-control rounded-pill rounded-end-0 w-75 d-inline-block cs-color-Search border-end-0 border border-dark" type="search" placeholder="Searching" aria-label="Search" />
                        <button type="button" className="btn rounded-pill rounded-start-0 cs-color-btn-Search  border-start-0 border border-dark"><i class="bi bi-search"></i></button>
                    </div>
                </div>
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {products.map((product) => (
                        <div key={product.id} className="d-flex flex-wrap align-items-center bg-white p-3 my-2 rounded">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="me-3"
                                style={{ width: "50px", height: "50px" }}
                            />
                            <span className="fs-4 flex-grow-1">{product.name}</span>
                            <div className="d-flex align-items-center">
                                <div className="text-end me-2">
                                    <div className="fw-bold">Bid from</div>
                                    <div>15/01/2025 11:46 AM</div>
                                    <div className="fw-bold">{product.price.toLocaleString()} baht</div>
                                </div>
                                <button className="btn btn-primary text-white" style={{ width: 150 }}>Select</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row bg-secondary py-4">
                <div className="d-flex justify-content-center">
                    <button className="fs-1 text-primary btn">
                        <IoReturnUpBackOutline className="fs-1 text-primary" /> Back
                    </button>
                </div>
            </div>
        </div>
    );
}