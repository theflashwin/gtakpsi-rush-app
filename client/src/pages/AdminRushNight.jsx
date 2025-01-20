import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { verifyUser } from "../js/verifications";

export default function AddRushNight() {
    const apiBase = import.meta.env.VITE_API_PREFIX + "/admin";
    const [rushNightName, setRushNightName] = useState("");
    const [rushNightTime, setRushNightTime] = useState("");
    const [results, setResults] = useState("");
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()

    const errorTitle = "Invalid User Credentials";
    const errorDescription = "If this is a mistake, try logging back in";

    useEffect(() => {

        async function fetch() {

            await verifyUser()
                .then(async (response) => {

                    if (response == false) {
                        navigate(`/error/${errorTitle}/${errorDescription}`);
                    }

                })
                .catch((error) => {

                    navigate(`/error/${errorTitle}/${errorDescription}`);

                });

            setLoading(false);

        }

        if (loading == true) {
            fetch();
        }

    });

    const handleRequest = async (endpoint, payload, method = "post") => {
        try {
          const updatedPayload = { ...payload };
      
          if (updatedPayload.time) {
            // Convert datetime-local value to UTC (ISO 8601 format)
            updatedPayload.time = new Date(updatedPayload.time).toISOString();
          }
          const response = await axios[method](`${apiBase}/${endpoint}`, updatedPayload);
          setResults(JSON.stringify(response.data, null, 2));
        } catch (error) {
          setResults(error.response?.data || "An error occurred");
        }
      };
      

    return (
        <div className="w-screen h-screen bg-slate-800 flex flex-col overflow-y-auto items-center">
            <h1 className="mb-2 text-left font-bold bg-gradient-to-r from-sky-700 via-amber-600 to-sky-700 animate-text bg-clip-text text-transparent text-4xl">
                Add Rush Night
            </h1>
            <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                        <input
                            className="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:ring focus:ring-blue-400"
                            type="text"
                            placeholder="Name"
                            value={rushNightName}
                            onChange={(e) => setRushNightName(e.target.value)}
                        />
                        <input
                            className="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:ring focus:ring-blue-400"
                            type="datetime-local"
                            placeholder="Name"
                            value={rushNightTime}
                            onChange={(e) => setRushNightTime(e.target.value)}
                        />

                    <div className="flex justify-center">
                        <button
                            onClick={() =>
                                handleRequest("add-rush-night", { name: rushNightName, time: rushNightTime })
                            }
                            className="bg-gradient-to-r mt-3 from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                            type="button"
                        >
                            Submit
                        </button>
                    </div>

                    </div>
            </div>
        </div>

    );
};

