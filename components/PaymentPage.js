"use client";

import React from "react";
import Script from "next/script";
import Footer from "./Footer";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/Useractions";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { notFound } from "next/navigation";


const PaymentPage = ({ id }) => {
    const { data: session } = useSession()
    const [paymentform, setpaymentform] = useState({ name: "", message: "", amount: "" });
    const [currentUser, setcurrentUser] = useState({});
    const [payments, setpayments] = useState([]);
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        getdata()
    }, [])


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const paymentDone = params.get("paymentdone");
    
        console.log("PaymentDone value after redirect:", paymentDone);
    
        if (paymentDone === "true") {
            console.log("Triggering toast after redirect...");
    
            setTimeout(() => {
                toast('🚀 Payment has been made. Thanks for your support!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    transition: Bounce,
                });
            }, 500);
    
            const newUrl = window.location.pathname;
            window.history.replaceState({}, '', newUrl);
        }
    }, []);



    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getdata = async (params) => {
        let u = await fetchuser(id)
        setcurrentUser(u)
        let dbpayments = await fetchpayments(id)
        setpayments(dbpayments)
    }

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                console.log("Razorpay loaded:", window.Razorpay);
                resolve(true);
            };
            script.onerror = () => {
                console.error("Failed to load Razorpay script");
                resolve(false);
            };
            document.body.appendChild(script);
        });
    };




    const pay = async (amount) => {
        const scriptLoaded = await loadRazorpay();

        if (!scriptLoaded || !window.Razorpay) {
            alert("Failed to load Razorpay. Check script or network connection.");
            return;
        }

        let a = await initiate(amount, id, paymentform);
        let orderID = a.id;

        const options = {
            key: currentUser.razorpayid,
            amount: amount,
            currency: "INR",
            name: "Get Me a Chai",
            description: "Test Transaction",
            order_id: orderID,
            callback_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/razorpay`,
            prefill: {
                name: "Gaurav Kumar",
                email: "gaurav.kumar@example.com",
                contact: "9000090000",
            },
            theme: { color: "#3399cc" },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    let username = currentUser.username;
    if (username && username.includes(id)) {
        return (
            <>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                />
                <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
                <div className="">
                    <img className="object-cover w-full h-[60vh]" src={currentUser.coverpic} alt="error loading" />
                </div>
                <div className="relative">
                    <img
                        className="absolute left-[47%] rounded-full border-2 border-white -bottom-12"
                        src={currentUser.profilepic}
                        height={100}
                        width={100}
                        alt="error loading"
                    />
                </div>
                <div className="text-white flex justify-center mt-14">@{id}</div>
                <div className="text-white flex flex-col gap-1 items-center">
                    <h1 className="text-2xl font-bold">JB2A - Jules&Ben's Animated Assets</h1>
                    <span>Lets help {id} get a chai!</span>
                    <div className="flex gap-2 text-sm text-gray-400">
                        {payments.length} {payments.length == 1 ? "payment" : "payments"} . ₹{payments.reduce((a, b) => a + b.amount, 0)} raised
                    </div>
                    <button
                        type="button"
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-10 py-2.5 me-2 my-5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                    >
                        Join for free
                    </button>
                </div>
                <div className="flex w-[80vw] mx-auto gap-3 text-white mt-7">
                    <div className="supporters w-1/2 bg-slate-800 rounded-lg border border-gray-600 p-7">
                        <h1 className="font-bold text-lg text-center mb-5">SUPPORTERS</h1>
                        {payments.length == 0 && <p>No payments yet</p>}
                        {payments.map((p, i) => {
                            return (
                                <div key={i} className="flex items-center">
                                    <Image src="/images/pay.gif" height={35} width={35} alt="error loading" />
                                    <p className="text-sm">
                                        {p.name} donated an amount of <span className="font-bold">₹{p.amount}</span> with a message "{p.message}"
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="w-1/2 bg-slate-800 rounded-lg border border-gray-600 p-7">
                        <h1 className="font-bold text-lg text-center mb-5">MAKE A PAYMENT</h1>
                        <div className="flex flex-col gap-2">
                            <input onChange={handleChange} type="text" value={paymentform.name ? paymentform.name : ""} name="name" placeholder="Enter Name" className="w-full p-3 rounded-lg bg-slate-900" />
                            <input onChange={handleChange} type="text" value={paymentform.message ? paymentform.message : ""} name="message" placeholder="Enter Message" className="w-full p-3 rounded-lg bg-slate-900" />
                            <input onChange={handleChange} type="text" value={paymentform.amount ? paymentform.amount : ""} name="amount" placeholder="Enter Amount" className="w-full p-3 rounded-lg bg-slate-900" />
                            <button
                                type="button"
                                onClick={() => pay(paymentform.amount)}
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 my-3 w-1/4 self-center disabled:opacity-60"
                                disabled={paymentform.name == "" || paymentform.message == "" || paymentform.amount?.length < 1}
                            >
                                Pay
                            </button>
                        </div>
                        <div className="flex justify-center gap-5 my-2">
                            <button className="bg-slate-900 p-3 rounded-lg border border-gray-500" onClick={() => pay(10)}>Pay ₹10</button>
                            <button className="bg-slate-900 p-3 rounded-lg border border-gray-500" onClick={() => pay(20)}>Pay ₹20</button>
                            <button className="bg-slate-900 p-3 rounded-lg border border-gray-500" onClick={() => pay(30)}>Pay ₹30</button>
                        </div>
                    </div>
                </div>
                <div className="invisible">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur esse quisquam magnam consectetur sunt
                    debitis doloribus qui magni? Mollitia a quidem, adipisci quod sint at aliquid dolores molestiae numquam, velit
                    sit fugiat magnam, debitis excepturi illum illo aliquam cum reprehenderit. Fugit molestias, tenetur doloribus
                    dolorem nobis dicta corporis in esse commodi similique voluptatibus, eaque non quisquam distinctio modi
                    architecto soluta rem dolor eligendi at tempora, adipisci totam? Tempora ea
                </div>
                <div>
                    <Footer />
                </div>
            </>
        );
    }
    else {
        return (
            <div className="text-white text-3xl">
                <h1>404 Not Found</h1>
            </div>
        )
    }
};

export default PaymentPage;
