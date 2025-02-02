import { Dropdown } from "react-bootstrap";
import "../pagescss/selectpicture.css";
import { FaBahtSign } from "react-icons/fa6";
export default function Post() {
    const examplecomment = [
        { name: "Naruto", comment: "So interesting.", img: "https://www.beartai.com/wp-content/uploads/2024/02/Naruto-1600x840.jpg" },
        { name: "Sasuke", comment: "Beautiful as hellll!", img: "https://pm1.aminoapps.com/6493/8e7caf892a720f98952caf5f589e2c265458a291_hq.jpg" },
        { name: "Sakura", comment: "Your idea is fantastic.", img: "https://i.pinimg.com/736x/8a/0e/8d/8a0e8d8762e8790a788d0c84a68f650a.jpg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that avciejawo ivjoriae joiawj;ogi jroaijgar ehguegij sziovfjowie heasuilli.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" },
        { name: "Kakashi", comment: "My next homework gonnabe like that.", img: "https://i.redd.it/54lk9zp713kc1.jpeg" }


    ];

    const Allcomment = ({ items }) => {
        return (<>
            <div className="container">
                <div className="overflow-auto" style={{ maxHeight: "350px" }}>
                    {items.map((item) => (
                        <div>
                            <div className="row m-2 ">
                                <div className="c-comment col-2">
                                    <img className="rounded-circle c-img-comment" src={item.img} />
                                </div>
                                <div className="c-comment col-7 h-100">
                                    <div className="cs-fs">{item.name}</div>
                                    <div>{item.comment}</div>
                                </div>
                                <div className="c-comment col-2">

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>);
    };
    return (
        <>
            <div className="container-fluid p-0">
                <div className="row bg-secondary">
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
                </div>
                <div className="row bg-secondary p-3 ">
                    <div className="row ">
                        <div className="col-12 col-sm-7 bg-secondary p-0 mx-auto">
                            <div id="testtest" class="carousel slide" data-bs-ride="carousel">
                                <div className="c-card-icon cs-z-index-icon">
                                    <span className="me-2 ">784185</span>
                                    <i className="bi bi-heart-fill fs-5 text-primary "></i>
                                </div>
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#testtest" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#testtest" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#testtest" data-bs-slide-to="2" aria-label="Slide 3"></button>
                                </div>
                                <div class="carousel-inner">
                                    <div class="carousel-item active c-item">
                                        <img src="https://static0.colliderimages.com/wordpress/wp-content/uploads/sharedimages/2024/04/naruto-shippuden-tv-series-poster.jpg" class="d-block w-100 c-img" alt="..." />
                                    </div>
                                    <div class="carousel-item c-item">
                                        <img src="https://f.ptcdn.info/063/031/000/1430885341-narutoandh-o.jpg" class="d-block w-100 c-img" alt="..." />
                                    </div>
                                    <div class="carousel-item c-item">
                                        <img src="https://narutodiary.wordpress.com/wp-content/uploads/2015/09/1403797397-minato-o.jpg" class="d-block w-100 c-img" alt="..." />
                                    </div>
                                </div>
                                <button class="carousel-control-prev " type="button" data-bs-target="#testtest" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon " ></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#testtest" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" ></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                            <div className="bg-primary-lighter p-2">
                                <div className="d-flex align-items-center justify-content-center">
                                    <i className="bi bi-heart me-2" />
                                    <div className="fw-bold">LIKE</div>
                                    <i class="bi bi-share ms-3 me-2"></i>
                                    <div className="fw-bold">SHARE</div>
                                </div>
                            </div>

                            <div className="text-decoration-underline mt-3 mb-2">
                                About the work
                            </div>

                            <div className="p-4 border border-dark">

                                <div className="m-2">
                                    Size {"         150 x 45 cm"}
                                </div>
                                <div className="m-2">
                                    Rarity {"           -"}
                                </div>
                                <div className="m-2">
                                    Type {"         Hand draw"}
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-sm-4 bg-secondary p-2 mx-auto">
                            <div className="d-flex align-items-center justify-content-between">
                                <h1>Marc Quinn</h1>
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <i class="bi bi-three-dots fs-2 me-2"></i>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" >Delete<i class="bi bi-trash3-fill"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" >Edit<i class="bi bi-pencil-square"></i></a></li>
                                        <li><a class="dropdown-item d-flex align-items-center justify-content-between" >Report<i class="bi bi-flag-fill"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="fw-light">
                                Floating dragon, 2025 #Dragon
                            </div>
                            <div className="mt-5 fw-light">
                                Imagination dragon on canvas.
                            </div>
                            <div className="fw-light">
                                150 x 45 cm
                            </div>
                            <h5 className="text-primary fw-bold fs-2 mt-4"><FaBahtSign />50,000</h5>
                            <button type="button" class="btn btn-primary btn-lg rounded-pill w-100 text-white">Add to cart</button>
                            <div className="p-1 mt-4 text-center cs-bg-comment mb-0">
                                Comment
                            </div>
                            <div className="cs-bg-allcomment w-100 ">
                                <Allcomment items={examplecomment} />
                                <div className="d-flex justify-content-center align-items-center m-2">
                                    <div className="rounded-pill rounded-end-0 border-end-0 border border-dark p-2">
                                    <img className="rounded-circle c-img-sent-comment " src="https://www.beartai.com/wp-content/uploads/2024/02/Naruto-1600x840.jpg" />
                                    </div>
                                    <input className="form-control rounded-pill rounded-end-0 rounded-start-0 w-75 d-inline-block border-end-0 border-start-0 border border-dark p-3" type="search" placeholder="Searching" aria-label="Search" />
                                    <button type="button" className="btn rounded-pill rounded-start-0 border-start-0 border border-dark p-3"><i class="bi bi-send-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}