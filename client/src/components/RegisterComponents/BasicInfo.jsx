import React from "react";

export default function BasicInfo(props) {

    return (
        <div>
            <h1 className="mb-2 text-left font-bold bg-gradient-to-r from-sky-700 via-amber-600 to-sky-700 animate-text bg-clip-text text-transparent text-4xl">Basic Info</h1>
            <h1 className="text-slate-500 text-left mb-4">First, let's get some basic information about you!</h1>
            <form class="text-left w-full max-w-lg">
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-first-name">
                            First Name
                        </label>
                        <input ref={props.firstname} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="grid-first-name" type="text" placeholder="George" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-last-name">
                            Last Name
                        </label>
                        <input ref={props.lastname} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-last-name" type="text" placeholder="Burdell" />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-password">
                            Email
                        </label>
                        <input ref={props.email} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" id="grid-password" placeholder="gburdell3@gatech.edu" />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-first-name">
                            Housing
                        </label>
                        <input ref={props.housing} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="grid-first-name" type="text" placeholder="Glenn 346" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-last-name">
                            Phone
                        </label>
                        <input ref={props.phone} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-last-name" type="text" placeholder="1111111111" />
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-first-name">
                            GTID
                        </label>
                        <input ref={props.gtid} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none" id="grid-first-name" type="text" placeholder="903753779" />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-last-name">
                            Major
                        </label>
                        <input ref={props.major} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500" id="grid-last-name" type="text" placeholder="Biochemistry" />
                    </div>
                </div>
                
                <div class="flex flex-wrap -mx-3 mb-4">
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-city">
                            Pronouns
                        </label>
                        <input ref={props.pronouns} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 leading-tight " id="grid-city" type="text" placeholder="she/her" />
                    </div>
                    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-state">
                            Year
                        </label>
                        <div class="relative">
                            <select ref={props.year} class="block appearance-none w-full bg-gray-700 text-gray-200 py-3 px-4 pr-8 rounded leading-tight " id="grid-state">
                                <option>First</option>
                                <option>Second</option>
                                <option>Third</option>
                                <option>Fourth</option>
                                <option>Fifth+</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-200">
                                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-2">
                    <div class="w-full px-3">
                        <label class="block uppercase tracking-wide text-gray-100 text-xs font-bold mb-2" for="grid-password">
                            How did you find us?
                        </label>
                        <input ref={props.exposure} class="appearance-none block w-full bg-gray-700 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500" id="grid-password" placeholder="Word of Mouth, Tabling Event, etc.." />
                    </div>
                </div>
                <button
                    onClick={props.func}
                    class="bg-gradient-to-r mt-3 from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="button"
                >Submit</button>

            </form>
        </div>
    )

}