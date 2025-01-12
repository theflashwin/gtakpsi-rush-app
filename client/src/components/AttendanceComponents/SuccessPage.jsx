import React, { useState } from "react";

export default function SuccessPage() {

    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex flex-col justify-center items-center"
            style={{
                backgroundImage: "url('/backgrounds/home.jpg')",
            }}
        >
            <div className="flex items-center justify-center w-28 h-28 bg-green-500 rounded-full border-4 border-white">
                <svg
                    className="w-16 h-16 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mt-6 text-center">You're Checked In!</h1>

            {/* Description */}
            <p className="text-lg text-white mt-3 text-center max-w-xl">Make sure to grab a name tag and proceed inside the room.</p>
        </div>
    );
}