export default function Information() {
    return (<div className="container-fluid bg-secondary d-flex flex-column justify-content-start align-items-center vh-100 w-100 text-center">
        <h1 className="my-5 fw-light">Information</h1>

        <div className="form-floating my-4 col-3">
            <input type="text" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="name@example.com" />
            <label htmlFor="floatingInput" className="ms-2 ">
                <i class="bi bi-person-fill me-2"></i>User name
            </label>
        </div>
        <div className="my-4 col-3">
            <div class="input-group border border-dark rounded p-2">
                <span class="input-group-text bg-secondary border border-secondary">
                    <i class="bi bi-gender-trans"></i>
                </span>
                <select class="form-select bg-secondary border border-secondary">
                    <option selected>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">lgbtqai2s+</option>
                </select>
            </div>
        </div>
        <div className="form-floating my-4 col-3">
            <input type="date" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="" />
            <label htmlFor="floatingInput" className="ms-2 ">
                <i class="bi bi-calendar-fill me-2"></i>Birth date
            </label>
        </div>
        <div className="form-floating my-4 col-3">
            <input type="email" className="form-control bg-secondary border border-dark" id="floatingInput" placeholder="0878618964" />
            <label htmlFor="floatingInput" className="ms-2 ">
                <i className="bi bi-telephone-fill me-2 "></i>Contact +66
            </label>
        </div>
        <div className="d-grid gap-2 col-2 my-4">
            <button className="btn cs-color rounded-pill" type="button">Confirm</button>
        </div>
    </div>);
}