import Searchbar from "../../component/searchbar";
import Navbar from "../../component/navbar";
import { IoReturnUpBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Product() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [user, setuser] = useState();
    const API_URL = process.env.REACT_APP_API_URL;
    // 🚀 ดึงข้อมูลจาก Backend
    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') }).then(response => {
            setuser(response.data);
            axios.post("http://localhost:5000/product", { artist: response.data.username, typepost: "ordinary" })
            .then((response) => {
                console.log("Response Data:", response.data);
                setProducts(response.data);
            })
            .catch((error) => console.error("Error fetching products:", error));
        }).catch(error => {
            console.log(error);
        });
       
    }, []);
    

    // ✏️ ฟังก์ชันเปิดโหมดแก้ไข
    const handleEdit = (id) => {
        setProducts(products.map(product =>
            product._id === id ? { ...product, isEditing: true } : product
        ));
    };

    // 💾 ฟังก์ชันบันทึกข้อมูล
    const handleSave = async (id) => {
        const productToUpdate = products.find(p => p._id === id);
        try {
            await axios.put(`http://localhost:5000/product/${id}`, {
                name: productToUpdate.name,
                image: productToUpdate.image,
                stock: productToUpdate.stock,
                price: productToUpdate.price,
            });
            setProducts(products.map(product =>
                product._id === id ? { ...product, isEditing: false } : product
            ));
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    // 🔄 ฟังก์ชันเปลี่ยนค่าตัวเลข
    const handleChange = (id, field, value) => {
        setProducts(products.map(product =>
            product._id === id ? { ...product, [field]: value } : product
        ));
    };

    // 🗑️ ฟังก์ชันลบสินค้า
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/products/${id}`);
            setProducts(products.filter(product => product._id !== id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    return (
        <div className="container-fluid p-0 bg-secondary min-vh-100">
            <div className="row">
                <Navbar />
            </div>

            <div className="row bg-secondary justify-content-center px-3">
                <div className="col-12 col-md-8">
                    {products.map((product) => (
                        <div key={product._id} className="d-flex flex-wrap align-items-center bg-white p-3 my-2 rounded" onClick={()=>{navigate(`/post/${product._id}`)}}>
                            <img src={product.img} alt={product.name} className="me-3" style={{ width: "50px", height: "50px" }} />
                            <span className="fs-4 flex-grow-1">{product.name}</span>

                            <div className="d-flex flex-column text-end flex-grow-1">
                                {/* แก้ไข Stock */}
                                <div className="text-dark">
                                    Remaining:{" "}
                                    {product.isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control d-inline w-25"
                                            value={product.stock}
                                            onChange={(e) => handleChange(product._id, "stock", e.target.value)}
                                        />
                                    ) : (
                                        <span className="text-primary">{product.stock}</span>
                                    )} pieces
                                </div>

                                {/* แก้ไข Price */}
                                <div className="text-dark">
                                    Price:{" "}
                                    {product.isEditing ? (
                                        <input
                                            type="number"
                                            className="form-control d-inline w-25"
                                            value={product.price}
                                            onChange={(e) => handleChange(product._id, "price", e.target.value)}
                                        />
                                    ) : (
                                        <span className="text-primary">{product.price.toLocaleString()}</span>
                                    )} baht
                                </div>
                            </div>

                          
                            
                        </div>
                    ))}
                </div>
            </div>

            <div className="row bg-secondary py-4">
                <div className="d-flex justify-content-center">
                    <button className="fs-1 text-primary btn" onClick={() => navigate("/forseller")}>
                        <IoReturnUpBackOutline className="fs-1 text-primary" /> Back
                    </button>
                </div>
            </div>
        </div>
    );
}
