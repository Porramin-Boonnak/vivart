import { useState, useEffect, useRef } from "react";
import { FaEdit } from "react-icons/fa";
import TuuImage from "../pictures/Tuu.jpg";
import Navbar from "../component/navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../pagescss/F2EBE9.css";

export default function Shipping() {
    const [progress, setProgress] = useState(25);
    const [isPayment, setIsPayment] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [addaddress, setaddaddress] = useState(false);
    const [alladdress, setalladdress] = useState();
    const [selectedAddresses, setSelectedAddresses] = useState([]);
    const [name, setname] = useState("")
    const [address, setaddress] = useState("")
    const [zip, setzip] = useState("")
    const [city, setcity] = useState("")
    const [country, setcountry] = useState("")
    const [phone, setphone] = useState("")
    const [edit, setedit] = useState(false);
    const [cart, setCart] = useState([]);
    const [user, setUser] = useState(null);
    const [ship, setship] = useState(false);
    const [bill, setbill] = useState(null);
    const [countdown, setCountdown] = useState(null);
    const [ip, setip] = useState(null);
    const hasFetched = useRef(false);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const accode = "tmpwoktXABBQMDi[pl]FTaDTwuvkLUJ2czfvioLzqjybewpMLYgtis[sa]HHaFkJjhD2x8GUOET6w6NlNCs5zm9vsExf9ZyyTg[tr][tr]";
    useEffect(() => {
        axios.post(API_URL + '/status', { token: localStorage.getItem('token') })
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                alert("Please login");
                navigate('/signin');
            });
        axios.get('https://api64.ipify.org?format=json')
            .then(response => {
                setip(response.data.ip);
            })
            .catch(error => {
                console.error("Error fetching IP:", error);
            });
        axios.post(`${API_URL}/get_address`, { token: localStorage.getItem('token') }).then(response => { setalladdress(response.data); console.log(response.data) })
    }, [API_URL, navigate]);

    useEffect(() => {
        if (user && user._id && !hasFetched.current) {
            hasFetched.current = true;
            axios.get(`${API_URL}/cart/${user._id}`)
                .then(response => {
                    setCart(response.data);
                    response.data.map(item => {
                        if (item.type === "Hand draw" || item.type === "Sculpture" || item.type === "Painting") {
                            setship(true);
                        }
                    }
                    )
                })
                .catch(error => {
                    console.error("Error fetching cart data:", error);
                });
        }
    }, [user, API_URL])

    useEffect(() => {
        const handleBeforeUnload = (e) => {
            e.preventDefault();
            if (isPayment) {
                setIsPayment(false)
                cart.map(item => {
                    const data = {
                        _id: item._id_post,
                        typepost: item.typepost,
                        quantity: item.quantity
                    };
                    axios.put(`${API_URL}/amount`, data)
                });
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isPayment]);

    useEffect(() => {
        if (countdown === null || bill === null) return;

        const interval = setInterval(async () => {
            setCountdown(prev => {
                if (prev > 0) {
                    return prev - 1;
                } else {

                    axios.post(`${API_URL}/proxy`, {
                        url: `https://tmwallet.thaighost.net/apipp.php?username=porramin&password=mos25437&con_id=106728&id_pay=${bill.id_pay}&method=cancel`
                    })
                        .then(response => console.log("Canceled:", response.data))
                        .catch(error => console.error("Error canceling:", error));


                    cart.map(async (item) => {
                        const data = {
                            _id: item._id_post,
                            typepost: item.typepost,
                            quantity: item.quantity
                        };

                        await axios.put(`${API_URL}/amount`, data);
                    });
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(interval);

    }, [countdown]);


    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const handleNext = async () => {
        let check = false;
        let hasError = false;

        const requests = cart.map(item => {
            const data = {
                _id: item._id_post,
                typepost: item.typepost,
                quantity: item.quantity,
                payment: "waiting"
            };
            return axios.post(`${API_URL}/amount`, data)
                .then(response => {
                    check = true;
                })
                .catch(e => {
                    alert("จำนวนผิดพลาด");
                    hasError = true;
                });

        });

        await Promise.allSettled(requests);
        if (!hasError && check) {
            setProgress(prev => Math.min(prev + 37.5, 100));
            axios.post(`${API_URL}/proxy`, { url: `https://tmwallet.thaighost.net/apipp.php?username=porramin&password=mos25437&amount=${totalPrice}&ref1=${user.username}&con_id=106728&method=create_pay` })
                .then(response => {
                    console.log(response.data)
                    if (response.data.status === 1) {
                        axios.post(`${API_URL}/proxy`, { url: `https://tmwallet.thaighost.net/apipp.php?username=porramin&password=mos25437&con_id=106728&id_pay=${response.data.id_pay}&type=01&promptpay_id=0933658682&method=detail_pay` })
                            .then(response => {
                                console.log(response.data);
                                if (response.data.status === 1) {
                                    setbill(response.data); setIsPayment(true); setCountdown(response.data.time_out)
                                }
                            })
                    }
                })

        }
    };



    const handleaddress = () => {
        const data = {
            username: user.username,
            name: name,
            address: address,
            zip: zip,
            city: city,
            country: country,
            phone: phone
        }
        axios.post(`${API_URL}/address`, data).then(axios.post(`${API_URL}/get_address`, { token: localStorage.getItem('token') }).then(response => { setalladdress(response.data) }));
        setaddaddress(false);
    };

    const handleedit = (_id) => {
        const data = {
            token: localStorage.getItem('token'),
            _id: _id,
            data: {
                username: user.username,
                name: name,
                address: address,
                zip: zip,
                city: city,
                country: country,
                phone: phone
            }
        }
        axios.put(`${API_URL}/edit_address`, data).then(axios.post(`API_URL}/get_address`, { token: localStorage.getItem('token') }).then(response => { setalladdress(response.data) }));
        setedit(false)
    };

    const handledelete = (_id) => {
        axios.delete(`${API_URL}/delete_address`, {
            headers: {
                'Content-Type': 'application/json', // ระบุว่าเป็น JSON
            },
            data: {
                token: localStorage.getItem('token'), // ส่ง token ใน body
                _id: _id  // ส่ง _id ใน body
            }
        }).then(axios.post(`${API_URL}/get_address`, { token: localStorage.getItem('token') }).then(response => { setalladdress(response.data); }));
    };

    const handlePurchase = () => {
        setProgress(100);
        setIsComplete(true);
        setIsPayment(true);
    };
    const paymentclick = () => {
        console.log(bill.id_pay)
        axios.post(`${API_URL}/proxy`, {
            url: `https://tmwallet.thaighost.net/apipp.php?username=porramin&password=mos25437&con_id=106728&method=confirm&id_pay=${bill.id_pay}&accode=${accode}&account_no=0431494574&ip=${ip}`
        })
            .then(response => {
                console.log(response.data)
                if (response.data.status === 1) {
                    const cartRequests = cart.map(async (item) => {
                        const data = {
                            _id: item._id_post,
                            typepost: item.typepost,
                            quantity: item.quantity,
                            payment: "success",
                            username: user.username
                        };
                        const sellandbuy = {
                            _id_post: item._id,
                            typepost: item.typepost,
                            quantity: item.quantity,
                            customer: user.username,
                            price: Number(item.price),
                            own: item.own,
                            gender: user.gender,
                            age: (() => {
                                const birth = new Date(user.birthdate); // ตรวจสอบให้แน่ใจว่า `user.birthDate` มีค่าที่ถูกต้อง
                                const today = new Date();
                                let age = today.getFullYear() - birth.getFullYear();

                                // ตรวจสอบว่าวันเกิดยังมาไม่ถึงในปีนี้หรือไม่
                                if (
                                    today.getMonth() < birth.getMonth() ||
                                    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
                                ) {
                                    age--;
                                }

                                return age; // return ค่าที่คำนวณได้
                            })(),
                            time: new Date().toISOString()
                        };
                        await axios.get(`${API_URL}/bank/${item.own}`).then(async (res) => {
                            const data = {
                                username: res.data.username,
                                nameaccount: res.data.nameaccount,
                                bank: res.data.bank,
                                number: res.data.number,
                                totalPrice : totalPrice,
                                status : "waiting"
                            }
                            await axios.post(`${API_URL}/payout`, data);
                        })
                        await axios.post(`${API_URL}/history`, sellandbuy);
                        await axios.post(`${API_URL}/success`, data);
                        await axios.delete(`${API_URL}/cart/${user._id}/${item._id_post}`);
                    });
                    Promise.all(cartRequests)
                        .then(() => {
                            handlePurchase();
                            return 0;
                        })
                        .catch(error => console.error("Error processing cart:", error));
                    
                }
            })
            .catch(error => console.error("Error confirming payment:", error));
    }
    const backtohome = () => {
        navigate('/');
    };
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    return (
        <>
            <Navbar />
            <div className="container-fulid py-4 " style={{ backgroundColor: "#F2EBE9", minHeight: "100vh" }}>
                {/* Progress Bar */}
                <div className="d-flex justify-content-between w-100 text-center">
                    <h5 className={progress >= 33.33 ? "text-dark" : "text-muted"}>Shipping</h5>
                    <h5 className={progress >= 66.66 ? "text-dark" : "text-muted"}>Payment</h5>
                    <h5 className={progress === 100 ? "text-dark" : "text-muted"}>Complete</h5>
                </div>

                <div className="progress mt-2">
                    <div className="progress-bar bg-dark" role="progressbar" style={{ width: `${progress}%`, transition: "width 0.5s ease-in-out" }}></div>
                </div>

                {isComplete ? (
                    <div className="text-center bg-white p-4 rounded shadow-sm mx-auto mt-4" style={{ maxWidth: "500px" }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="Success" className="img-fluid" style={{ maxWidth: "80px" }} />
                        <h2 className="text-danger mt-3">Thank you for your order!</h2>
                        <p>Your order has now been placed and you will shortly receive a notification.</p>
                        <button className="btn btn-dark mt-3" onClick={backtohome}>Back to home</button>
                    </div>
                ) : (
                    <div className="row mt-4">
                        {/* Left Section */}
                        <div className="col-lg-8 col-md-12">
                            <h2 className="border-bottom pb-2">{isPayment ? "Payment Methods" : "Delivery Address"}</h2>
                            <div className="p-3 bg-white shadow-sm rounded">
                                {isPayment ? (
                                    <div className="text-center">
                                        {bill ?
                                            <>
                                                <img src={`data:image/png;base64,${bill.qr_image_base64}`} alt="qr_image_base64" className="img-fluid" />
                                                <div>
                                                    เวลาที่เหลือ: {countdown !== null ? formatTime(countdown) : "กำลังโหลด..."}
                                                    <button className="btn btn-dark w-100 mt-4" onClick={() => paymentclick()}>Continue</button>
                                                </div>
                                            </>
                                            : <>Loading...</>
                                        }
                                    </div>
                                ) : ship ? (
                                    <>
                                        {alladdress ? alladdress.map(item => {
                                            return (edit ? <form>
                                                <div className="form-group">
                                                    <h1 className="font">Name</h1>
                                                    <input type="text" className="form-control" onChange={(e) => setname(e.target.value)} value={name || item.name} />
                                                </div>
                                                <div className="form-group">
                                                    <h1 className="font">Address</h1>
                                                    <input type="text" className="form-control" onChange={(e) => setaddress(e.target.value)} value={address || item.address} />
                                                </div>
                                                <div className="form-group">
                                                    <h1 className="font">Zip code</h1>
                                                    <input type="text" className="form-control" onChange={(e) => setzip(e.target.value)} value={zip || item.zip} />
                                                </div>
                                                <div className="form-group">
                                                    <h1 className="font">City</h1>
                                                    <input type="text" className="form-control" onChange={(e) => setcity(e.target.value)} value={city || item.city} />
                                                </div>
                                                <div className="form-group">
                                                    <h1 className="font">Country</h1>
                                                    <input type="text" className="form-control" onChange={(e) => setcountry(e.target.value)} value={country || item.country} />
                                                </div>
                                                <div className="form-group">
                                                    <h1 className="font">phone</h1>
                                                    <input type="text" className="form-control" onChange={(e) => setphone(e.target.value)} value={phone || item.phone} />
                                                </div>
                                                <button className="btn btn-dark w-100 mt-4" onClick={() => handleedit(item._id)}>Save</button>
                                            </form> : <div className="border rounded p-3 d-flex justify-content-between flex-wrap">
                                                <div>
                                                    <strong>{item.name}</strong>
                                                    <p className="mb-1">{item.address}</p>
                                                    <p className="mb-0">{item.city}</p>
                                                    <p className="mb-0">{item.zip}</p>
                                                    <p className="mb-0">{item.country}</p>
                                                    <p className="mb-0">📞 {item.phone}</p>
                                                </div>
                                                <div>
                                                    <i class="bi bi-pencil-square text-danger mt-3" style={{ cursor: "pointer" }} onClick={() => {
                                                        setedit(true);
                                                        setname(item.name);
                                                        setaddress(item.address);
                                                        setzip(item.zip);
                                                        setcity(item.city);
                                                        setcountry(item.country);
                                                        setphone(item.phone);
                                                    }}></i>
                                                    <i class="bi bi-trash3-fill text-danger ms-3 me-3" onClick={() => handledelete(item._id)} style={{ cursor: "pointer" }}></i>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            value={item} // ค่า value คือ _id ของ address
                                                            checked={item === selectedAddresses} // ถ้า _id ตรงกับ address ที่เลือก ให้ทำเครื่องหมาย
                                                            onChange={() => setSelectedAddresses(item)} // เมื่อมีการเปลี่ยนแปลง
                                                        />
                                                    </label>
                                                </div>
                                            </div>)
                                        }) : <>Loading...</>}
                                        {addaddress ? <form>
                                            <div className="form-group">
                                                <h1 className="font">Name</h1>
                                                <input type="text" className="form-control" onChange={(e) => setname(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <h1 className="font">Address</h1>
                                                <input type="text" className="form-control" onChange={(e) => setaddress(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <h1 className="font">Zip code</h1>
                                                <input type="text" className="form-control" onChange={(e) => setzip(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <h1 className="font">City</h1>
                                                <input type="text" className="form-control" onChange={(e) => setcity(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <h1 className="font">Country</h1>
                                                <input type="text" className="form-control" onChange={(e) => setcountry(e.target.value)} />
                                            </div>
                                            <div className="form-group">
                                                <h1 className="font">phone</h1>
                                                <input type="text" className="form-control" onChange={(e) => setphone(e.target.value)} />
                                            </div>
                                            <button className="btn btn-dark w-100 mt-4" onClick={() => setaddaddress(false)}>Cancel</button>
                                            <button className="btn btn-dark w-100 mt-4" onClick={handleaddress}>Save and Continue</button>
                                        </form> :
                                            <><div className="text-danger mt-2" style={{ cursor: "pointer" }} onClick={() => setaddaddress(true)}>+ Add a new address</div>
                                                <button className="btn btn-dark w-100 mt-4" onClick={() => handleNext()}>Save and Continue</button></>}
                                    </>
                                ) : <>
                                    <div>No Shipping</div>
                                    <button className="btn btn-dark w-100 mt-4" onClick={() => handleNext()}>Continue</button>
                                </>}
                            </div>
                        </div>

                        {/* Right Section (Order Summary) */}
                        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                            <div className="p-3 bg-white shadow-sm rounded">
                                <h5>Order Summary</h5>
                                {cart.map((item) => (
                                    <p key={item._id} className="summary-item">
                                        {item.name} <span>{(item.price * item.quantity).toLocaleString()} THB</span>
                                        <img src={item.img} alt={item.name} className="item-image ms-3" />
                                    </p>

                                ))}
                                <div className="total">
                                    <strong>Total:</strong> <span>{totalPrice.toLocaleString()} THB</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
