import React, { useState } from "react";
import { verifyGTID } from "../../js/verifications";
import { useNavigate } from "react-router-dom";

export default function SplashPage(props) {

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        props.setGtid(e.target.value);
        setInputValue(e.target.value)
        if (e.target.value.trim() === "" || !verifyGTID(e.target.value.trim())) {
            setError("Invalid GTID");
        } else {
            setError(""); // Clear the error if input is valid
        }
        console.log(error)
    };

    return (
        <div
            className="w-full h-screen bg-slate-800 flex items-center justify-center"
            style={{
                backgroundImage: "url('backgrounds/home.jpg')",
                backgroundSize: "cover", // Ensures the image covers the entire div
                backgroundPosition: "center", // Centers the image
                backgroundRepeat: "no-repeat", // Prevents tiling
            }}
        >
            <div className="text-center">
                <p onClick={() => {
                    navigate("/register")
                }} class="cursor-pointer inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-black bg-blue-300 hover:bg-blue-100 rounded-full ">
                    <span class="ml-3 text-sm font-medium">Don't have an account? Create one now</span>
                    <svg class="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                    </svg>
                </p>
                <h1 className="text-6xl text-white font-extrabold mb-8">
                    <span className="underline decoration-sky-700">GT AKPsi</span> Rush Check In
                </h1>

                <div className="w-full max-w-md mx-auto flex items-center space-x-4">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        className={`flex-grow p-3 rounded-lg border-2 ${error ? "border-red-500" : "border-gray-300"
                            } focus:outline-none`}
                        placeholder="Enter your GTID"
                    />
                    <button
                        onClick={props.func}
                        className="bg-gradient-to-r from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    >
                        Submit
                    </button>
                </div>

                {/* Error Message */}
                {/* {error && (
                    <p className="mt-2 text-red-500 text-sm">{error}</p>
                )} */}
            </div>

        </div>
    );
}
