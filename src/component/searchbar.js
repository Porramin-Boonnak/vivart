import { Dropdown } from "react-bootstrap";

export default function Searchbar() {
    return (
        <div className="d-flex align-items-center bg-secondary py-2 px-4 position-relative">
            {/* Dropdown + Buttons */}
            <div className="d-flex align-items-center flex-shrink-0 gap-2 mt-2">
                {/* Assets */}
                <Dropdown>
                    <Dropdown.Toggle className="btn cs-color-btn rounded-pill border border-dark px-2 py-1 d-flex align-items-center" style={{ fontSize: "15px", height: "38px" }}>
                        <i className="bi bi-caret-down-fill me-2"></i>
                        <span className="d-none d-lg-inline-block">Assets</span>
                    </Dropdown.Toggle>
                </Dropdown>

                {/* Recommend Button */}
                <button className="btn cs-color-btn rounded-pill border border-dark px-2 py-1 d-flex align-items-center" style={{ fontSize: "15px", height: "38px" }}>
                    <i className="bi bi-star-fill me-2"></i>
                    <span className="d-none d-lg-inline-block">Recommend</span>
                </button>

                {/* Following Button */}
                <button className="btn cs-color-btn rounded-pill border border-dark px-2 py-1 d-flex align-items-center" style={{ fontSize: "15px", height: "38px" }}>
                    <i className="bi bi-person-check me-2"></i>
                    <span className="d-none d-lg-inline-block">Following</span>
                </button>
            </div>

            {/* Search Bar (ขนาดความสูงเท่ากับปุ่ม Assets แต่กว้างเท่าเดิม) */}
            <div className="d-flex align-items-center justify-content-center flex-grow-1 position-absolute mt-2" style={{ left: "55%", transform: "translateX(-50%)", marginTop: "10px" }}>
                <div className="d-flex align-items-center border border-dark rounded-pill px-2 py-1" style={{ width: "500px", height: "38px", backgroundColor: "#fff" }}>
                    <input
                        className="form-control border-0 shadow-none"
                        type="search"
                        placeholder="Searching"
                        aria-label="Search"
                        style={{ fontSize: "15px", color: "#264143", opacity: "0.6", flex: 1 }}
                    />
                    <button type="button" className="btn border-0 px-2 py-0">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
