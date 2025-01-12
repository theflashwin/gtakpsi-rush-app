import React from "react";
import { useParams } from "react-router-dom";

export default function MyError(props) {

    const {title, description} = useParams()

    const titleShown = title ? title : "Something untoward occurred..."
    const descriptionShown = description ? description : "Please try again later or contact support."

    return (
        <div
            className="w-screen h-screen bg-cover bg-center flex flex-col justify-center items-center"
            style={{
                backgroundImage: "url('/backgrounds/home.jpg')", // Path to your image
            }}
        >
            {/* Large Cross Icon with Thick White Border */}
            <div className="flex items-center justify-center w-28 h-28 bg-red-500 rounded-full border-4 border-white">
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
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-white mt-6 text-center">{title}</h1>

            {/* Description */}
            <p className="text-lg text-white mt-3 text-center max-w-xl">{description}</p>
        </div>
    );
}
