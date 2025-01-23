import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from 'dayjs';

import Navbar from "../components/Navbar";
import { verifyUser } from "../js/verifications";
import Loader from "../components/Loader";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FaEdit, FaTrash } from "react-icons/fa";
import Badges from "../components/Badge";


export default function RusheeZoom() {

    const { gtid } = useParams();
    const user = JSON.parse(localStorage.getItem('user'))

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [errorTitle, setErrorTitle] = useState("Uh Oh! Something untoward happened");
    const [errorDescription, setErrorDescription] = useState("Something really weird happened");
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentText, setEditedCommentText] = useState("");

    const [rushee, setRushee] = useState();
    const [isAddingComment, setIsAddingComment] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [ratings, setRatings] = useState({
        "Professionalism": null,
        "Goatedness": null,
        "Awesomeness": null,
        "Eye Contact": null,
    });

    const navigate = useNavigate();

    const api = import.meta.env.VITE_API_PREFIX;

    const ratingFields = [
        "Professionalism",
        "Goatedness",
        "Awesomeness",
        "Eye Contact",
    ];

    useEffect(() => {

        async function fetch() {

            await verifyUser()
                .then(async (response) => {

                    if (response == false) {
                        navigate(`/error/${errorTitle}/${errorDescription}`);
                    }

                    await axios.get(`${api}/rushee/${gtid}`)
                        .then((response) => {

                            if (response.data.status === "success") {

                                console.log(response.data.payload);
                                setRushee(response.data.payload);

                            } else {

                                navigate(`/error/${errorTitle}/${"Rushee with this GTID does not exist"}`);
                            }

                        });

                })
                .catch((error) => {

                    setError(true);
                    navigate(`/error/${errorTitle}/${errorDescription}`);

                });

            setLoading(false);

        }

        if (loading == true) {
            fetch();
        }

    });

    const handleAddComment = () => {
        setIsAddingComment(true);
    };

    const handleRatingChange = (field, value) => {
        setRatings({
            ...ratings,
            [field]: value,
        });
    };

    const handleSubmitComment = async () => {
        setLoading(true)

        const actualRatings = []

        for (const rating in ratings) {
            if (ratings[rating] != null) {
                actualRatings.push({
                    name: rating,
                    value: parseInt(ratings[rating])
                })
            }
        }

        const payload = {
            brother_id: "000000",
            brother_name: user.firstname + " " + user.lastname,
            comment: newComment,
            ratings: actualRatings,
        }

        console.log(user)

        await axios.post(`${api}/rushee/post-comment/${gtid}`, payload)
            .then((response) => {

                if (response.data.status === "success") {

                    window.location.reload();

                } else {

                    const title = "Uh Oh! Something weird happened..."
                    const description = "Something odd happened while submitting your comment..."

                    toast.error(`${response.data.message}`, {
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

            })
            .catch((error) => {

                console.log(error)

                const title = "Uh Oh! Something weird happened..."
                const description = "Some network error happened while submitting your comment..."

                navigate(`/error/${title}/${description}`)

            })

        // Reset the form after submission
        setNewComment("");
        setRatings({
            "Professionalism": null,
            "Goatedness": null,
            "Awesomeness": null,
            "Eye Contact": null,
        });
        setIsAddingComment(false);
        setLoading(false)
    };

    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(`https://rush-app-2024.web.app/rushee/${gtid}/${rushee.access_code}`).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
        });
    };

    const handleEditComment = (comment) => {
        setEditingCommentId(comment.comment); // Track the comment being edited
        setEditedCommentText(comment.comment); // Pre-populate with the existing comment text
    };

    const handleSubmitEdit = async (comment) => {

        console.log(comment)

        setLoading(true)
        const payload = {
            brother_id: "000000",
            brother_name: comment.brother_name,
            comment: editedCommentText,
            ratings: comment.ratings,
            night: comment.night,
        }

        await axios.post(`${api}/rushee/edit-comment/${gtid}`, payload)
            .then((response) => {

                if (response.data.status === "success") {

                    // window.location.reload();
                    console.log("worked")

                } else {

                    toast.error(`${response.data.message}`, {
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

            })
            .catch((err) => {

                console.log(error)
                toast.error(`Some network error occurred`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });

            })

        setEditingCommentId(null); // Reset editing state
        setEditedCommentText("");
        setLoading(false)

    }

    const handleDeleteComment = async (comment) => {

        setLoading(true)

        await axios.post(`${api}/rushee/edit-comment/${gtid}`, comment)
            .then((response) => {

                if (response.data.status === "success") {
                    window.location.reload();
                } else {
                    toast.error(`${response.data.message}`, {
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

            })
            .catch((error) => {

                console.log(error)

                toast.error(`Some network error occurred`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })

        setLoading(false)

    }

    return (
        <div>
            {loading ? (
                <Loader />
            ) : (
                <div>
                    <div className="h-screen w-screen bg-slate-800">
                        <Navbar />
                        <div className="h-10" />

                        <div className="min-h-screen bg-slate-800 py-10 text-gray-100 p-4">
                            {/* Profile Header */}
                            <div className="max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg overflow-hidden">
                                <div className="flex items-center space-x-6 p-6">
                                    <img
                                        src={rushee.image_url}
                                        alt={`${rushee.first_name} ${rushee.last_name}`}
                                        className="w-44 h-44 rounded-lg object-cover border-2 border-slate-600"
                                    />
                                    <div>
                                        <div className="flex flex-row gap-2 items-center">
                                            <h1 className="text-3xl font-bold">
                                                {rushee.first_name} {rushee.last_name}
                                            </h1>
                                            {rushee.attendance.map((event, idx) => (
                                                <Badges text={event.name} key={idx} />
                                            ))}
                                        </div>
                                        <p className="text-slate-300">Pronouns: {rushee.pronouns}</p>
                                        <p className="text-slate-300">Major: {rushee.major}</p>
                                        <p>Email: {rushee.email}</p>
                                        <p>Phone: {rushee.phone_number}</p>
                                        <p>Housing: {rushee.housing}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg mt-6 p-6 grid grid-cols-2 gap-6">
                                <div onClick={() => {
                                    navigate(`/pis/${gtid}`)
                                }} className="cursor-pointer flex items-center justify-center bg-slate-400 h-12 w-full rounded-lg bg-gradient-to-r from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
                                    Submit PIS
                                </div>
                                <div onClick={handleCopy} className="cursor-pointer flex items-center justify-center bg-slate-400 h-12 w-full rounded-lg bg-gradient-to-r from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 focus:ring transform transition hover:scale-105 duration-300 ease-in-out">
                                    {copied ? "Copied!" : "Copy Edit Page Link"}
                                </div>
                            </div>

                            {/* Ratings */}
                            <div className="max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg mt-6 p-6">

                                <h2 className="text-xl font-semibold text-gray-200">Ratings</h2>

                                <div className="flex flex-col gap-4 mt-4">
                                    {rushee.ratings.map((rating, idx) => (
                                        <div key={idx} className="w-full">
                                            <p className="text-gray-200 font-semibold">{rating.name}</p>
                                            <div className="w-full bg-gray-700 rounded-lg h-4 mt-1">
                                                <div
                                                    className="bg-blue-500 h-4 rounded-lg"
                                                    style={{ width: `${(rating.value / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                            <p className="text-sm text-gray-400 mt-1">{`${(rating.value / 5) * 100}%`}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* PIS Responses */}
                            <div className="max-w-4xl max-h-[40rem] mx-auto bg-slate-700 shadow-lg rounded-lg mt-6 p-6 overflow-y-scroll no-scrollbar">
                                <h2 className="text-xl font-semibold text-gray-200">PIS Details</h2>
                                <p className="mt-2 text-slate-300">
                                    🕒 Timeslot:{" "}
                                    {new Date(parseInt(rushee.pis_timeslot.$date.$numberLong)).toUTCString()}
                                </p>
                                <p className="mt-2 text-slate-300">
                                    Brother 1:{" "}
                                    {rushee.pis_signup.first_brother_first_name + " " + rushee.pis_signup.first_brother_last_name}
                                </p>
                                <p className="mt-2 text-slate-300">
                                    Brother 2:{" "}
                                    {rushee.pis_signup.second_brother_first_name + " " + rushee.pis_signup.second_brother_last_name}
                                </p>
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-gray-200">PIS Responses</h3>
                                    {rushee.pis.map((pis, idx) => (
                                        <div key={idx} className="mt-2 text-slate-300">
                                            <p>
                                                <strong>Q:</strong> {pis.question}
                                            </p>
                                            <p>
                                                <strong>A:</strong> {pis.answer}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Comments */}
                            <div className="max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg mt-6 p-6">
                                <h2 className="text-xl font-semibold text-gray-200 bg-slate-700 mb-2">
                                    Comments
                                </h2>
                                {!isAddingComment ? (
                                    <div
                                        onClick={handleAddComment}
                                        className="border-2 border-dashed border-gray-400 p-6 rounded-lg cursor-pointer flex items-center justify-center hover:bg-slate-600 transition duration-300"
                                    >
                                        <span className="text-3xl text-gray-400">+</span>
                                    </div>
                                ) : (
                                    <div className="bg-slate-600 p-4 rounded-lg">
                                        <textarea
                                            className="w-full p-2 bg-slate-700 text-gray-200 rounded-lg mb-4"
                                            placeholder="Add your comment..."
                                            value={newComment}
                                            onChange={(e) => setNewComment(e.target.value)}
                                        ></textarea>

                                        {ratingFields.map((field) => (
                                            <div key={field} className="mb-4">
                                                <label
                                                    htmlFor={field}
                                                    className="block text-gray-200 mb-2"
                                                >
                                                    {field}
                                                </label>
                                                <select
                                                    id={field}
                                                    className="w-full p-2 bg-slate-700 text-gray-200 rounded-lg"
                                                    value={ratings[field] || ""}
                                                    onChange={(e) =>
                                                        handleRatingChange(field, e.target.value)
                                                    }
                                                >
                                                    <option value="" disabled>
                                                        Not Seen
                                                    </option>
                                                    {/* {[...Array(6).keys()].map((value) => (
                                                        <option key={value} value={value}>
                                                            {value}
                                                        </option>
                                                    ))} */}
                                                    <option value={5}>Satisfactory</option>
                                                    <option value={0}>Unsatisfactory</option>
                                                </select>
                                            </div>
                                        ))}

                                        <button
                                            onClick={handleSubmitComment}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                )}
                                <div className="mt-4">
                                    {rushee.comments.map((comment, idx) => (
                                        <div
                                            key={idx}
                                            className="relative mt-4 bg-slate-600 p-4 rounded-lg"
                                        >
                                            {/* Buttons in the top-right corner */}
                                            <div className={user.firstname + " " + user.lastname === comment.brother_name && editingCommentId !== comment.comment ? "absolute top-2 right-2 flex space-x-2" : "hidden"}>
                                                <button
                                                    onClick={() => handleEditComment(comment)}
                                                    className="text-gray-400 hover:text-blue-500 text-xl"
                                                >
                                                    <FaEdit /> {/* Edit Icon */}
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteComment(comment)}
                                                    className="text-gray-400 hover:text-red-500 text-xl"
                                                >
                                                    <FaTrash /> {/* Delete Icon */}
                                                </button>
                                            </div>

                                            {/* Comment Content or Edit Field */}
                                            {editingCommentId === comment.comment ? (
                                                <div>
                                                    <textarea
                                                        className="w-full p-2 bg-slate-700 text-gray-200 rounded-lg mb-4"
                                                        value={editedCommentText}
                                                        onChange={(e) => setEditedCommentText(e.target.value)}
                                                    ></textarea>
                                                    <button
                                                        onClick={() => handleSubmitEdit(comment)}
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                                                    >
                                                        Submit
                                                    </button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <Badges text={comment.night.name} />
                                                    <div className="h-1" />
                                                    <p>
                                                        <strong className="text-gray-200">{comment.brother_name}:</strong> {comment.comment}
                                                    </p>
                                                </div>
                                            )}

                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {comment.ratings.map((rating, rIdx) => (
                                                    <span
                                                        key={rIdx}
                                                        className="bg-slate-500 text-gray-200 px-2 py-1 rounded text-sm"
                                                    >
                                                        {rating.name}: {rating.value == 5 ? "Satisfactory" : "Unsatisfactory"}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>


                            </div>

                            {/* Attendance */}
                            {/* <div className="max-w-4xl mx-auto bg-slate-700 shadow-lg rounded-lg mt-6 p-6">
                                <h2 className="text-xl font-semibold text-gray-200">Attendance</h2>
                                {rushee.attendance.map((event, idx) => (
                                    <p key={idx} className="mt-2 text-slate-300">
                                        {event.name} - {event.date}
                                    </p>
                                ))}
                            </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>

    );

}
