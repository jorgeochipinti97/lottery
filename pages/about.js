import Image from "next/image";
import { Layout } from "../components/layout";

export default function About() {
    return (
        <>
            <Layout>
                <div className="flex justify-center pt-5">
                    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white mb-5 ">
                        <Image src='/jorge.JPG' width={400} height={500} alt='jorge'/>
                        <div className="px-6 py-4">
                            <div className="text-gray-700  font-bold text-xl mb-2">Jorge Ochipinti</div>
                            <span className="text-gray-700 text-justify"> I leave my comfortable job in justice to get out of my comfort zone and set myself a new challenge, that of programming. My applied learning path was the following: HTML, CSS, Javascript, NodeJS, React, NextJS and Solidity. I believe that blockchain technology is the future, so I didn t take juniors jobs and focused on learning how to develop with Solidity.</span>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}