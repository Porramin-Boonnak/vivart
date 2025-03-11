import { Dropdown } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export default function Searchbar() {
    const navigate = useNavigate();
    const { filter } = useParams(); // ดึงค่า filter จาก URL

    const handleFilterSelect = (filter) => {
        navigate(`/search/${filter}`); // เปลี่ยนเส้นทางไปยัง URL ที่กรองประเภทนั้นๆ
    };
    
    const handleSearch = () => {
        const searchValue = document.getElementById("searchInput").value;
        if (searchValue) {
            navigate(`/search/${searchValue}`); // นำทางไปยังหน้าค้นหาพร้อมคำค้นหา
        }
    };
    
    return (
        <div className="d-flex justify-content-between align-items-center bg-secondary py-2 px-4" style={{ marginBottom: "-10px" }}>
            <div className="d-flex align-items-center" style={{ marginLeft: "200px" }}>
                <Dropdown>
                    <Dropdown.Toggle className="btn cs-color-btn rounded-pill border border-dark px-2 py-1 d-flex align-items-center" style={{ fontSize: "15px", marginLeft: "-110px" }}>
                        <i className="bi bi-caret-down-fill me-2"></i>
                        <div className="d-none d-lg-inline-block">Assets</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown drop="end">
                            <Dropdown.Toggle as="div" className="dropdown-item d-flex align-items-center">
                                Rarity
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between" onClick={() => handleFilterSelect("normal")}>
                                    Normal
                                    <i className="bi bi-fullscreen-exit"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between" onClick={() => handleFilterSelect("uniq")}>
                                    Unique
                                    <i className="bi bi-star-fill"></i>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown drop="end">
                            <Dropdown.Toggle as="div" className="dropdown-item d-flex align-items-center">
                                Type
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between" onClick={() => handleFilterSelect("Digital")}>
                                    Digital
                                    <i className="bi bi-film"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between" onClick={() => handleFilterSelect("Handdraw")}>
                                    Hand draw
                                    <i className="bi bi-palette-fill"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between" onClick={() => handleFilterSelect("Sculpture")}>
                                    Sculpture
                                    <i className="bi bi-piggy-bank-fill"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between" onClick={() => handleFilterSelect("Painting")}>
                                    Painting
                                    <i className="bi bi-brush-fill"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" className="d-flex align-items-center justify-content-between" onClick={() => handleFilterSelect("Photography")}>
                                    Photography
                                    <i className="bi bi-image-fill"></i>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="d-flex align-items-center flex-grow-1 justify-content-center" style={{ marginLeft: "-50px", marginBottom: "-15px" }}>
                <input
                    id="searchInput"
                    className="form-control rounded-pill rounded-end-0 cs-color-Search border-end-0 border border-dark px-2 py-0"
                    type="search"
                    placeholder="Searching"
                    aria-label="Search"
                    style={{ width: "500px", fontSize: "17px", color: "#264143", opacity: "0.6" }}
                />
                <button
                    type="button"
                    className="btn rounded-pill rounded-start-0 cs-color-btn-Search border-start-0 border border-dark px-2 py-0"
                    style={{ fontSize: "17px" }}
                    onClick={handleSearch} // Use the corrected function here
                >
                    <i className="bi bi-search"></i>
                </button>
            </div>
        </div>
    );
}
