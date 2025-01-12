import React from "react";

export default function Button(props) {

    const text = props.text ? props.text : "Submit"

    return (
        <button class="bg-gradient-to-r mt-3 from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
            type="button"
        >{text}</button>
    )

}