import { Dropdown } from "react-bootstrap";
export default function Searchbar(){
    return(<div className="row bg-secondary pt-3">
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
    </div>)
}