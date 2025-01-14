import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import Error from "../components/Error";
import Loader from "../components/Loader";
import Badges from "../components/Badge";

import Fuse from "fuse.js";

import { verifyUser } from "../js/verifications";

export default function Dashboard(props) {
    const [user, setUser] = useState(
        props.user ? props.user : JSON.parse(localStorage.getItem("user"))
    );
    const [loading, setLoading] = useState(true);

    const [errorTitle, setErrorTitle] = useState("Uh Oh! Something unexpected happened.");
    const [errorDescription, setErrorDescription] = useState("");
    const [error, setError] = useState(false);

    const [rushees, setRushees] = useState([]);
    const [filteredRushees, setFilteredRushees] = useState([]);
    const [query, setQuery] = useState("");

    const navigate = useNavigate();

    const api = import.meta.env.VITE_API_PREFIX;

    useEffect(() => {
        async function fetch() {
            setLoading(true);
            await verifyUser()
                .then(async (response) => {
                    if (response === false) {
                        navigate("/");
                    }

                    await axios
                        .get(`${api}/rushee/get-rushees`)
                        .then((response) => {
                            if (response.data.status === "success") {
                                setRushees(response.data.payload);
                                setFilteredRushees(response.data.payload);

                                console.log(response.data.payload)

                            } else {
                                setErrorDescription("There was some issue fetching the rushees");
                                setError(true);
                            }
                        })
                        .catch(() => {
                            setErrorDescription("There was some network error while fetching the rushees.");
                            setError(true);
                        });
                })
                .catch(() => {
                    setErrorDescription("There was an error verifying your credentials.");
                    setError(true);
                });

            setLoading(false);
        }

        if (loading === true) {
            fetch();
        }
    }, [loading, navigate]);

    const fuse = new Fuse(rushees, {
        keys: ["name", "gtid", "major", "email"],
        threshold: 0.3, // Adjust for strictness (0 = strict, 1 = loose)
    });

    const handleSearch = (e) => {
        const input = e.target.value;
        setQuery(input);

        if (input.trim() === "") {
            setFilteredRushees(rushees);
        } else {
            const fuzzyResults = fuse.search(input);
            setFilteredRushees(fuzzyResults.map((result) => result.item)); // Extract matching items
        }
    };

    return (
        <div>
            {error ? (
                <Error title={errorTitle} description={errorDescription} />
            ) : (
                <div>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="h-screen w-screen bg-slate-800 overflow-y-scroll">
                            <Navbar />

                            <div className="pt-20 p-4"> {/* Adjusted padding to account for Navbar */}
                                <div className="container mx-auto px-4">
                                    {/* Search Bar */}
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={handleSearch}
                                        placeholder="Search rushees..."
                                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-700 text-white placeholder-gray-400"
                                    />
                                </div>

                                <div className="container mx-auto px-4">
                                    <div className="grid gap-6 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                        {filteredRushees.map((rushee) => (
                                            <div
                                                onClick={() => {
                                                    navigate(`/brother/rushee/${rushee.gtid}`);
                                                }}
                                                key={rushee.id}
                                                className="flex cursor-pointer flex-col bg-slate-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-transparent hover:border-blue-500"
                                            >
                                                {/* Picture */}
                                                <img
                                                    className="w-full h-48 object-cover"
                                                    src={rushee.image_url}
                                                    alt={rushee.name}
                                                />

                                                {/* Content */}
                                                <div className="flex flex-col flex-grow p-4">
                                                    <div className="flex flex-row gap-4">

                                                        <h2 className="text-xl font-bold text-white mb-2 truncate">
                                                            {rushee.name}
                                                        </h2>
                                                        {rushee.attendance.map((event, idx) => (
                                                            <Badges text={event.name} key={idx} />
                                                        ))}

                                                    </div>
                                                    <p className="text-sm text-gray-400 mb-1 truncate">
                                                        {rushee.email}
                                                    </p>
                                                    <p className="text-sm text-gray-400 mb-1 truncate">
                                                        {rushee.major}
                                                    </p>
                                                    <p className="text-sm text-gray-400">GTID: {rushee.gtid}</p>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {rushee.ratings.map((rating, rIdx) => (
                                                            <span
                                                                key={rIdx}
                                                                className="bg-slate-500 text-gray-200 px-2 py-1 rounded text-sm"
                                                            >
                                                                {rating.name}: {rating.value}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
