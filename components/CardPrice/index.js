import React from 'react'

export const CardPrice = ({ isBSC, balance }) => {
    return (
        <div>
            <div data-aos="fade-down-left" className='flex justify-center' >
                <span className="  mb-10 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Lottery Prize: {balance ? balance : '0 '} {isBSC ? ' BNB' : ' ETH'} </h5>
                    <span className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Lottery Price: 0.001 {isBSC ? ' BNB' : ' ETH'} </span>
                </span>
            </div>
        </div>
    )
}
