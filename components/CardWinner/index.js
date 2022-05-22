import React from 'react'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const CardWinner = ({ isLoaded, winner, winnerAddress }) => {
    return (
        <div>
            {isLoaded && winner != undefined
                ? <div data-aos="fade-down-left" className='flex justify-center' >
                    <span className="mb-10 block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Last Winner <EmojiEventsIcon /></h5>
                        <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {`${winner}`}
                        </p>
                        <p className="mb-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white">
                            {`  ${winnerAddress}`}
                        </p>

                    </span>
                </div>
                : null}

        </div>
    )
}
