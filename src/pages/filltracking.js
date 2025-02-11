import Navbar from "../component/navbar"
import { IoReturnUpBackOutline } from "react-icons/io5";
export default function Filltracking() {
    return (
        <div className="container-fluid p-0 bg-secondary vh-100 vw-100">
            <div className="row">
                <Navbar />
            </div>
            <div className="row">
                <div className="d-flex justify-content-center  justify-content-md-between">
                    <div className="fs-1 mt-5 ms-2 d-none d-md-block">Fill tracking number</div>
                    <div className="d-flex justify-content-center align-items-center mt-5 me-2">
                        <input className="form-control rounded-pill rounded-end-0 w-75 d-inline-block cs-color-Search border-end-0 border border-dark" type="search" placeholder="Searching" aria-label="Search" />
                        <button type="button" className="btn rounded-pill rounded-start-0 cs-color-btn-Search  border-start-0 border border-dark"><i class="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="d-flex justify-content-between">
                    <div className="d-flex justify-content-between">
                        <div className="col-3">
                            <img src="https://m.media-amazon.com/images/M/MV5BZTNjOWI0ZTAtOGY1OS00ZGU0LWEyOWYtMjhkYjdlYmVjMDk2XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" className="v-25 w-25" />
                        </div>
                        <div className="col-9">
                            ghthtrhtr
                        </div>
                    </div>
                    <div>
                        efergrthtyjtyrj
                    </div>
                </div>
            </div>
            <div className="row">
                <div>
                    <div className="d-flex justify-content-center align-items-center mb-5">
                        <button className="fs-1 text-primary btn"> <IoReturnUpBackOutline className="fs-1 text-primary" />Back</button>
                    </div>
                </div>
            </div>
        </div>)
}