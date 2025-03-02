import Navbar from "../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import TuuImage from "../pictures/Tuu.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Product() {
    const navigate = useNavigate();

    const forsellerclick = () => {
        navigate("/forseller");
    };

    // สร้าง State เก็บข้อมูลสินค้า
    const [products, setProducts] = useState([
        { id: 1, name: "Light star", image: TuuImage, stock: 50, price: 7000, isEditing: false },
        { id: 2, name: "Reach star", image: TuuImage, stock: 35, price: 10000, isEditing: false },
        { id: 3, name: "Hidden moon", image: TuuImage, stock: 42, price: 999, isEditing: false },
    ]);

    // ฟังก์ชันเปิดโหมดแก้ไข
    const handleEdit = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, isEditing: true } : product
        ));
    };

    // ฟังก์ชันบันทึกข้อมูลที่แก้ไข
    const handleSave = (id) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, isEditing: false } : product
        ));
    };

    // ฟังก์ชันเปลี่ยนค่าตัวเลข
    const handleChange = (id, field, value) => {
        setProducts(products.map(product =>
            product.id === id ? { ...product, [field]: value } : product
        ));
    };

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100">
            <div className="row">
                <Navbar />
            </div>
            <div className="row bg-secondary">
                <div className="d-flex justify-content-center justify-content-md-between">
                    <div className="fs-1 mt-5 ms-5 d-none d-md-block">Product</div>
                    <div className="d-flex justify-content-center align-items-center mt-5 me-5">
                        <input
                            className="form-control rounded-pill rounded-end-0 w-75 d-inline-block cs-color-Search border-end-0 border border-dark"
                            type="search"
                            placeholder="Searching"
                            aria-label="Search"
                        />
                        <button type="button" className="btn rounded-pill rounded-start-0 cs-color-btn-Search border-start-0 border border-dark">
                            <i className="bi bi-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {products.map((product) => (
                        <div key={product.id} className="d-flex flex-wrap align-items-center bg-white p-3 my-2 rounded">
                            <img src={product.image} alt={product.name} className="me-3" style={{ width: "50px", height: "50px" }} />
                            <span className="fs-4 flex-grow-1">{product.name}</span>

                            <div className="d-flex flex-column text-end flex-grow-1">
                                {/* Input สำหรับแก้ไข Stock */}
                                <div className="text-dark">
                                    Remaining:{" "}
                                    {product.isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control d-inline w-25"
                                            value={product.stock}
                                            onChange={(e) => handleChange(product.id, "stock", e.target.value)}
                                        />
                                    ) : (
                                        <span className="text-primary">{product.stock}</span>
                                    )} pieces
                                </div>

                                {/* Input สำหรับแก้ไข Price */}
                                <div className="text-dark">
                                    Price:{" "}
                                    {product.isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control d-inline w-25"
                                            value={product.price}
                                            onChange={(e) => handleChange(product.id, "price", e.target.value)}
                                        />
                                    ) : (
                                        <span className="text-primary">{product.price.toLocaleString()}</span>
                                    )} baht
                                </div>
                            </div>

                            {/* ปุ่ม Edit หรือ Save */}
                            {product.isEditing ? (
                                <button className="text-success border-0 bg-transparent ms-3" onClick={() => handleSave(product.id)}>
                                    Save
                                </button>
                            ) : (
                                <button className="text-danger border-0 bg-transparent ms-3" onClick={() => handleEdit(product.id)}>
                                    Edit
                                </button>
                            )}
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
