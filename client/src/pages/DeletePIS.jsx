import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { verifyUser } from "../js/verifications";

export default function DeletePIS() {
    const apiBase = import.meta.env.VITE_API_PREFIX + "/admin";

    const [question, setQuestion] = useState("");
    const [questionType, setQuestionType] = useState("");
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState("");

    const navigate = useNavigate();

    const errorTitle = "Invalid User Credentials";
    const errorDescription = "If this is a mistake, try logging back in";

    useEffect(() => {
        async function fetch() {
            await verifyUser()
                .then(async (response) => {
                    if (response === false) {
                        navigate(`/error/${errorTitle}/${errorDescription}`);
                    }
                })
                .catch(() => {
                    navigate(`/error/${errorTitle}/${errorDescription}`);
                });

            setLoading(false);
        }

        if (loading === true) {
            fetch();
        }
    }, [loading, navigate]);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-orange-500">
            <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full max-w-lg">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Admin Panel</h1>

                {/* Delete PIS Question */}
                <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Delete PIS Question</h2>
                    <input
                        type="text"
                        placeholder="Question"
                        className="border p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Question Type"
                        className="border p-3 w-full rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={questionType}
                        onChange={(e) => setQuestionType(e.target.value)}
                    />
                    <button
                        onClick={() =>
                            handleRequest("delete_pis_question", { question, question_type: questionType })
                        }
                        className="bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded w-full hover:from-red-600 hover:to-red-800"
                    >
                        Delete Question
                    </button>
                </div>

                {results && (
                    <div className="mt-6 bg-gray-100 p-4 rounded">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Results:</h3>
                        <pre className="text-sm text-gray-700 overflow-auto">{results}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}
