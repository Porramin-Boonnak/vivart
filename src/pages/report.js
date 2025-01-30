export default function Report() {
    return (
        <div className="container-fluid w-100 min-vw-100 vh-100 d-flex justify-content-center align-items-center text-center bg-secondary">
            <div className="container bg-white p-4 rounded shadow-lg" style={{ maxWidth: 1000, height: 600 }}>
                <div className="d-flex justify-content-between align-items-center pb-2">
                    <h3 className="m-0"></h3>
                    <button className="btn btn-light border-0 fs-4" aria-label="Close">
                        ✖
                    </button>
                </div>
                <h1 className="text-center mt-5 text-primary">
                    Does this post infringe copyright?
                </h1>
                <h5 className="text-center mt-4">Your report will be anonymous</h5>

                <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                    <div className="form-check m-auto d-flex align-items-center">
                        <input className="form-check-input fs-3 me-2" type="checkbox" value="" id="flexCheckDefault" />
                        <h3 className="form-check-label m-0" htmlFor="flexCheckDefault">
                            Default checkbox
                        </h3>
                    </div>

                    <div className="form-check m-auto d-flex align-items-center mt-4">
                        <input className="form-check-input fs-3 me-2" type="checkbox" value="" id="flexCheckDefault" />
                        <h3 className="form-check-label m-0" htmlFor="flexCheckDefault">
                            Default checkbox
                        </h3>
                    </div>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                </div>
            </div>
        </div>
    );
}
