import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Loader from "../components/Loader";
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
                        <div className="h-screen w-screen bg-slate-800">
                            <Navbar />

                            <div className="pt-20 p-4"> {/* Adjusted padding to account for Navbar */}
                                <input
                                    type="text"
                                    value={query}
                                    onChange={handleSearch} // Trigger search on every key press
                                    placeholder="Search rushees..."
                                    className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />

                                <div className="grid gap-4 mt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredRushees.map((rushee) => (
                                        <div
                                            key={rushee.id}
                                            className="p-4 bg-slate-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex border-2 border-white hover:border-blue-500"
                                        >
                                            {/* Picture Placeholder */}
                                            <img className="w-56 h-56 rounded-lg object-cover" src={rushee.image_url} alt="Rushee" />

                                            {/* Rushee Info */}
                                            <div onClick={() => {
                                                navigate(`/brother/rushee/${rushee.gtid}`)
                                            }} className="w-2/3 pl-4">
                                                <h2 className="text-2xl font-bold text-white">
                                                    {rushee.name}
                                                </h2>
                                                <p className="text-lg text-gray-300">{rushee.email}</p>
                                                <p className="text-lg text-gray-300">{rushee.major}</p>
                                                <p className="text-lg text-gray-300">GTID: {rushee.gtid}</p>
 
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
