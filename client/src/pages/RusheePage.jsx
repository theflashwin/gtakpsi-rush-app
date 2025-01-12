import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Badges from "../components/Badge";
import axios from "axios";

import Navbar from "../components/Navbar";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RusheePage() {
    const { gtid, link } = useParams();
    const [rushee, setRushee] = useState(null); // Stores the current state of the rushee
    const [initialRushee, setInitialRushee] = useState(null); // Stores the initial fetched state
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const api = import.meta.env.VITE_API_PREFIX;
    
    useEffect(() => {
        async function fetch() {
            await axios
                .get(`${api}/rushee/${gtid}`)
                .then((response) => {
                    if (response.data.status === "success") {
                        const fetchedRushee = response.data.payload;

                        if (fetchedRushee.access_code !== link) {
                            navigate(`/error/${"Incorrect Access Code"}/${"Reach out to the Support Team for assistance"}`);
                        } else {
                            setRushee(fetchedRushee);
                            setInitialRushee(fetchedRushee); // Save the initial state for comparison
                        }
                    } else {
                        navigate(`/error/${"Rushee with this GTID does not exist"}`);
                    }
                })
                .catch(() => {
                    navigate(`/error/${"An error occurred"}/${"Please try again later"}`);
                });

            setLoading(false);
        }

        if (loading) {
            fetch();
        }
    }, [loading, api, gtid, link, navigate]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rushee || !initialRushee) {
            alert("Unable to process changes.");
            return;
        }

        // Create a payload with only the changed fields
        const payload = Object.keys(rushee)
            .filter((key) => rushee[key] !== initialRushee[key]) // Compare initial and current state
            .map((key) => ({
                field: key,
                new_value: rushee[key],
            }));

        if (payload.length === 0) {
            alert("No changes were made.");
            return;
        }

        try {
            const response = await axios.post(`${api}/rushee/update-rushee/${gtid}`, payload);
            console.log(response);
            toast.success(`${response.data.message || "Rushee updated successfully!"}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } catch (err) {
            toast.error(`${err.response?.data?.message || "Failed to update rushee"}`, {
                                    position: "top-center",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "dark",
                                });
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRushee({ ...rushee, [name]: value });
    };

    return (
        <div>

            <Navbar  />

            {loading ? (
                <Loader />
            ) : (

                <div className="min-h-screen bg-slate-800 py-10 text-gray-100">
                    <div className="h-10" />
                    {/* Rushee Information */}
                    <div className="max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg overflow-hidden">
                        <div className="flex items-center space-x-6 p-6">
                            <img
                                src={initialRushee.image_url}
                                alt={`${initialRushee.first_name} ${initialRushee.last_name}`}
                                className="w-44 h-44 rounded-lg object-cover border-2 border-slate-600"
                            />
                            <div>
                                <div className="flex flex-row gap-2 items-center">
                                    <h1 className="text-3xl font-bold">
                                        {initialRushee.first_name} {initialRushee.last_name}
                                    </h1>
                                    {initialRushee.attendance.map((event, idx) => (
                                        <Badges text={event.name} key={idx} />
                                    ))}
                                </div>
                                <p className="text-slate-300">Pronouns: {initialRushee.pronouns}</p>
                                <p className="text-slate-300">Major: {initialRushee.major}</p>
                                <p>Email: {initialRushee.email}</p>
                                <p>Phone: {initialRushee.phone_number}</p>
                                <p>Housing: {initialRushee.housing}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-semibold text-gray-200">PIS Details</h2>
                                <p className="mt-2 text-slate-300">
                                    🕒 Timeslot:{" "}
                                    {new Date(parseInt(initialRushee.pis_timeslot.$date.$numberLong)).toUTCString()}
                                </p>
                    </div>

                    {/* Form Section */}
                    <div className="mt-10 max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg p-6">
                        <h1 className="text-3xl font-bold text-left mb-6">Edit Rushee Info</h1>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Row 1 */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* First Name */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">First Name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={rushee.first_name}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                {/* Last Name */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">Last Name</label>
                                    <input
                                        type="text"
                                        name="last_name"
                                        value={rushee.last_name}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Housing */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">Housing</label>
                                    <input
                                        type="text"
                                        name="housing"
                                        value={rushee.housing}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                {/* Phone Number */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone_number"
                                        value={rushee.phone_number}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Row 3 */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Email */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={rushee.email}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                {/* GTID */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">GTID</label>
                                    <input
                                        type="text"
                                        name="gtid"
                                        value={rushee.gtid}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Row 4 */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* Major */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">Major</label>
                                    <input
                                        type="text"
                                        name="major"
                                        value={rushee.major}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                                {/* Class */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">Class</label>
                                    <input
                                        type="text"
                                        name="class"
                                        value={rushee.class}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Row 5 */}
                            <div className="grid grid-cols-1">
                                {/* Pronouns */}
                                <div>
                                    <label className="block text-gray-200 font-semibold mb-1">Pronouns</label>
                                    <input
                                        type="text"
                                        name="pronouns"
                                        value={rushee.pronouns}
                                        onChange={handleChange}
                                        className="w-full p-3 bg-slate-600 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
                            >
                                Save Changes
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
