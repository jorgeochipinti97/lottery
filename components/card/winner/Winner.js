export const Winner = ({winner, address, amount}) => {
    return (
        <>   
            <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Last Winner: {winner}</h5>
                    <h5 className="mb-2 text-xs font-bold tracking-tight text-gray-900 dark:text-white">{address}</h5>
                </div>
            </div>
        </>
    )
}