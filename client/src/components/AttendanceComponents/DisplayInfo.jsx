import React from "react";
import Button from "../Button";

export default function DisplayInfo(props) {

    const initialRushee = props.rushee

    return (
        <div className="w-screen h-screen bg-slate-800 text-white flex justify-center items-center">

            <div>
                <h1 className="mb-2 text-center font-bold bg-gradient-to-r from-sky-700 to-amber-600 bg-clip-text text-transparent text-4xl">Is this you?</h1>
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
                            </div>
                            <p className="text-slate-300">Pronouns: {initialRushee.pronouns}</p>
                            <p className="text-slate-300">Major: {initialRushee.major}</p>
                            <p className="text-slate-300">Email: {initialRushee.email}</p>
                            <p className="text-slate-300">Phone: {initialRushee.phone_number}</p>
                            <p className="text-slate-300">Housing: {initialRushee.housing}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row items-center gap-5 w-screen justify-center">
                    <div onClick={props.goBack}>
                        <Button text={"No? Go Back"} />
                    </div>
                    <div onClick={props.checkIn}>
                        <Button text={"Yes! Check In"} />
                    </div>
                </div>
            </div>

        </div>
    )

}