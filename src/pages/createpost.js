import "../pagescss/createpost.css";
export default function Createpost() {
    return (<>
        <div className="container-fluid p-0 bg-secondary">
            <div className="row">
                <div className="text-primary text-center fs-2 mt-3">
                    Create post
                </div>
                <div className="text-center fs-5 mt-3 mb-5">
                    What do you want to post today?
                </div>
            </div>
            <div className="row">
                <div className="d-flex justify-content-start align-items-center">
                    <div className="d-inline fs-2 mx-5 m-5">Normal Post</div>
                    <button className="btn d-inline m-3 p-2 h-100 w-25 bg-white">Create Post</button>
                </div>
            </div>
            <div className="row">
                <div className="d-flex justify-content-center align-items-center">
                    <hr className="border-primary border-3 w-100 m-5" />
                </div>
            </div>
            <div className="row">
            <div className="d-flex justify-content-start align-items-center mb-2">
                    <div className="d-inline fs-2 mx-5 m-5">Sell Post</div>
                    <button className="btn d-inline m-3 p-2 h-100 w-25 bg-white ms-auto">Digital Art<div className="text-primary">unique</div></button>
                    <button className="btn d-inline m-3 p-2 h-100 w-25 bg-white">Physical Art<div className="text-primary">unique</div></button>
                    <button className="btn d-inline m-3 p-2 h-100 w-25 bg-white">Physical Art<div className="cs-color-create">ordinary</div></button>
                </div>
            </div>
            <div className="row">

            </div>
        </div>
    </>)
}