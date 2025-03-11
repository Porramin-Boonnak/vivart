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
        <div className="d-flex align-items-center bg-secondary py-2 px-4 position-relative">
            <div className="d-flex align-items-center flex-shrink-0 gap-2 mt-2">
                <Dropdown>
                    <Dropdown.Toggle className="btn cs-color-btn rounded-pill border border-dark px-2 py-1 d-flex align-items-center" style={{ fontSize: "15px", height: "38px" }}>
                        <i className="bi bi-caret-down-fill me-2"></i>
                        <span className="d-none d-lg-inline-block">Assets</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown drop="end">
                            <Dropdown.Toggle as="div" className="dropdown-item d-flex align-items-center">
                                Rarity
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => handleFilterSelect("normal")}>
                                    Normal <i className="bi bi-fullscreen-exit"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleFilterSelect("uniq")}>
                                    Unique <i className="bi bi-star-fill"></i>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown drop="end">
                            <Dropdown.Toggle as="div" className="dropdown-item d-flex align-items-center">
                                Type
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#" onClick={() => handleFilterSelect("Digital")}>
                                    Digital <i className="bi bi-film"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleFilterSelect("Handdraw")}>
                                    Hand draw <i className="bi bi-palette-fill"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleFilterSelect("Sculpture")}>
                                    Sculpture <i className="bi bi-piggy-bank-fill"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleFilterSelect("Painting")}>
                                    Painting <i className="bi bi-brush-fill"></i>
                                </Dropdown.Item>
                                <Dropdown.Item href="#" onClick={() => handleFilterSelect("Photography")}>
                                    Photography <i className="bi bi-image-fill"></i>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Dropdown.Menu>
                </Dropdown>

                <button className="btn cs-color-btn rounded-pill border border-dark px-2 py-1 d-flex align-items-center" style={{ fontSize: "15px", height: "38px" }}>
                    <i className="bi bi-star-fill me-2"></i>
                    <span className="d-none d-lg-inline-block">Recommend</span>
                </button>

                <button className="btn cs-color-btn rounded-pill border border-dark px-2 py-1 d-flex align-items-center" style={{ fontSize: "15px", height: "38px" }}>
                    <i className="bi bi-person-check me-2"></i>
                    <span className="d-none d-lg-inline-block">Following</span>
                </button>
            </div>

            <div className="d-flex align-items-center justify-content-center flex-grow-1 position-absolute mt-2" style={{ left: "55%", transform: "translateX(-50%)", marginTop: "10px" }}>
                <div className="d-flex align-items-center border border-dark rounded-pill px-2 py-1" style={{ width: "500px", height: "38px", backgroundColor: "#fff" }}>
                    <input
                        id="searchInput"
                        className="form-control border-0 shadow-none"
                        type="search"
                        placeholder="Searching"
                        aria-label="Search"
                        style={{ fontSize: "15px", color: "#264143", opacity: "0.6", flex: 1 }}
                    />
                    <button type="button" className="btn border-0 px-2 py-0" onClick={handleSearch}>
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
