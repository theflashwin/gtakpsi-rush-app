import React, { useState } from "react";

export default function SuccessPage({ title, description, link, gtid }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://rush-app-2024.web.app/rushee/${gtid}/${link}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
        });
    };

    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex flex-col justify-center items-center"
            style={{
                backgroundImage: "url('/backgrounds/home.jpg')", // Path to your image
            }}
        >
            {/* Large Checkmark with Thick White Border */}
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
            <h1 className="text-3xl font-bold text-white mt-6 text-center">{title}</h1>

            {/* Description */}
            <p className="text-lg text-white mt-3 text-center max-w-xl">{description}</p>

            {/* Link Box with Copy Button */}
            <div className="mt-8 w-full max-w-md p-4 bg-white shadow-lg rounded-lg flex items-center justify-between border-2 border-gray-300">
                {/* Display the Link */}
                <div className="flex-grow">
                    <a className="text-slate-800 font-medium">{`https://rush-app-2024.web.app/rushee/${gtid}/${link}`}</a>
                </div>

                {/* Copy Button */}
                <button
                    onClick={handleCopy}
                    className="bg-gradient-to-r from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
        </div>
    );
}
