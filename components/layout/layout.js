import Head from 'next/head'
import { Footer } from '../footer'
import { Navbar } from '../navbar'
import Image from 'next/image'

export const Layout = ({ children, account, isLoad }) => {
    return (
        <>
            <Head>
                <title>Lottery</title>
            </Head>

            <main >
                <div className='flex flex-col  mt-3'>
                    <div className='self-center'>
                        {isLoad ?
                            <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <div  >
                                    <h5 className="ext-centerr mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Welcome</h5>
                                    <span className="text-xs font-bold tracking-tight text-gray-900">{account}</span>
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">To the lottery of the Future!</h5>
                                </div>
                            </div>
                            : null}
                    </div>
                    <div className='mt-4 self-center'>
                        <Navbar />
                    </div>
                </div>
                {children}
            </main>
            <Footer />
        </>
    )
}