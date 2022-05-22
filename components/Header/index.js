import React from 'react'

export const Header = ({ isBSC, isLoaded }) => {
    return (
        <>
            {isBSC == undefined ? <span data-aos="fade-left">Please connect to correct Network</span> : null}
            {isLoaded ? null : <span data-aos="fade-left">Please connect install Metamask </span>}

            {isLoaded
                ? (
                    <>
                        {
                            isBSC
                                ? <span data-aos="fade-left">
                                    you are connect to BSC
                                </span>
                                : null
                        }
                    </>

                ) : null}

            {isBSC == false
                ? <span data-aos='fade-left'>you are connect to Rinkeby</span>
                : null}
            <div className="flex justify-center mb-5">
                <img src="/lottery.jpeg" />
            </div>
            <span className='text-3xl pb-4 '>The lottery of the future NOW!</span>
        </>
    )
}
