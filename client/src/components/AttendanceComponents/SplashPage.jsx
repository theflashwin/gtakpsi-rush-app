import React, { useState, useRef, useEffect } from "react";
import { verifyGTID } from "../../js/verifications";
import { useNavigate } from "react-router-dom";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const LiquidShader = () => {

    const meshRef = useRef();
    const clock = new THREE.Clock();

    useFrame(() => {
        const time = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = time;
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (meshRef.current) {
                const aspect = window.innerWidth / window.innerHeight;
                const scaleX = aspect > 1 ? aspect : 1;
                const scaleY = aspect > 1 ? 1 : 1 / aspect;

                // Scale the plane to ensure no whitespace
                meshRef.current.scale.set(scaleX * 3, scaleY * 3, 1);

                // Update resolution uniform
                meshRef.current.material.uniforms.uResolution.value.set(
                    window.innerWidth,
                    window.innerHeight
                );
            }
        };

        handleResize(); // Initial resize
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <mesh ref={meshRef}>
            {/* Plane large enough to cover all screen sizes */}
            <planeGeometry args={[1, 1, 64, 64]} />
            <shaderMaterial
                uniforms={{
                    uTime: { value: 0 },
                    uResolution: {
                        value: new THREE.Vector2(window.innerWidth, window.innerHeight),
                    },
                    uColors: {
                        value: [
                            new THREE.Color("#0033A0"), // Blue (AKPsi)
                            new THREE.Color("#FFD700"), // Gold (AKPsi)
                            new THREE.Color("#FFD700"), // Reinforce Gold
                            new THREE.Color("#0033A0"), // Reinforce Blue
                        ],
                    },
                }}
                vertexShader={`
                    uniform float uTime;
                    varying vec2 vUv;

                    void main() {
                        vUv = uv;
                        vec3 transformed = position;

                        // Add randomness to the waves
                        transformed.z += sin(uv.x * 2.0 + uTime * 1.5) * 0.2;
                        transformed.z += cos(uv.y * 2.0 + uTime * 1.0) * 0.2;
                        transformed.z += sin(uv.x * 2.0 + uTime * 0.5) * 0.1;

                        gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
                    }
                `}
                fragmentShader={`
                    uniform vec3 uColors[4]; // Array of colors (blue and gold focus)
                    uniform float uTime;
                    varying vec2 vUv;

                    void main() {
                        // Blend between blue and gold with emphasis on gold
                        vec3 color = mix(uColors[0], uColors[1], sin(vUv.y * 5.0 + uTime * 0.3) * 0.5 + 0.5);
                        color = mix(color, uColors[2], cos(vUv.x * 5.0 + uTime * 0.5) * 0.7 + 0.3); // More gold
                        color = mix(color, uColors[3], sin(vUv.y * 10.0 + uTime * 0.7) * 0.2 + 0.8); // Reinforce blue

                        gl_FragColor = vec4(color, 1.0);
                    }
                `}
                side={THREE.DoubleSide}
                transparent={true}
            />
        </mesh>
    );
};

export default function SplashPage(props) {

    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    const handleInputChange = (e) => {
        props.setGtid(e.target.value);
        setInputValue(e.target.value)
        if (e.target.value.trim() === "" || !verifyGTID(e.target.value.trim())) {
            setError("Invalid GTID");
        } else {
            setError(""); // Clear the error if input is valid
        }
        console.log(error)
    };

    return (

        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-blue-800 via-yellow-00 to-blue-800">
            {/* Fullscreen Canvas */}
            <Canvas
                camera={{
                    position: [0, 0, 1], // Adjusted camera for fullscreen plane
                }}
                className="absolute top-0 left-0 w-full h-full"
            >
                <LiquidShader />
            </Canvas>

            {/* Content Overlay */}
            <div className="absolute text-center inset-0 flex flex-col items-center justify-center z-10">
                <div className="text-center">
                    <p onClick={() => {
                        navigate("/register")
                    }} class="cursor-pointer inline-flex justify-between items-center py-1 px-1 pe-4 mb-7 text-sm text-black bg-blue-300 hover:bg-blue-100 rounded-full ">
                        <span class="ml-3 text-sm font-medium">Don't have an account? Create one now</span>
                        <svg class="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                        </svg>
                    </p>
                    <h1 className="text-6xl text-white font-extrabold mb-8">
                        <span className="underline decoration-sky-700">GT AKPsi</span> Rush Check In
                    </h1>

                    <div className="w-full max-w-md mx-auto flex items-center space-x-4">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            className={`flex-grow p-3 rounded-lg border-2 ${error ? "border-red-500" : "border-gray-300"
                                } focus:outline-none`}
                            placeholder="Enter your GTID"
                        />
                        <button
                            onClick={props.func}
                            className="bg-gradient-to-r from-sky-700 to-amber-600 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                        >
                            Submit
                        </button>
                    </div>

                    {/* Error Message */}
                    {/* {error && (
                    <p className="mt-2 text-red-500 text-sm">{error}</p>
                )} */}
                </div>
            </div>
        </div>
    );
}
