import React from "react";

import { Blocks } from 'react-loader-spinner'

export default function Loader() {

    return (
        <div className="w-screen bg-slate-800 h-screen items-center flex justify-center">
            <Blocks
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                visible={true}
            />
        </div>
    )

}