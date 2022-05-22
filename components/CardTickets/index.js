import {  useState } from "react"
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
export const CardTickets = ({ isBSC, contract, account }) => {
    const [price, setPrice] = useState()
    const [_name, set_name] = useState()

    const buyTickets = async (e, c) => {

        try {
            const precio = e * 0.001
            const ethers = window.web3.utils.toWei(String(precio), 'ether')
            await contract.methods.enter(e, c).send({ from: account, value: ethers })
        }
        catch (err) {
            console.log(err)
            alert('Please fill all the inputs')
        }
    }


    const generarGanador = async () => {
        try {


            await contract.methods.pickWinner().send({ from: account })
        } catch (err) {
            console.log(err)
        }

    }
    const withdraw = async () => {
        try {

            await contract.methods.withdraw().send({ from: account })

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div >
            <div >
                <span className="text-3xl">Try your Luck</span><br />
                <span className="text-4xl">Buy your tickets!</span>
            </div>
            <input className="pt-1 pb-1 w-80 rounded-lg mt-3 bg-gray-900 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type='text' onChange={(e) => setPrice(e.target.value)} placeholder="Nº Tickets" /><br />
            <input className="pt-1 pb-1 w-80  rounded-lg bg-gray-900 mt-3 mb-3 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" type='text' onChange={(e) => set_name(e.target.value)} placeholder="Name" /><br />

            <div>
                <button type="button" className=" text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 w-25 mb-2 "
                    onClick={() => isBSC ? alert('please connect to ETH Mainnet ') : buyTickets(price, _name)}>
                    <svg className=" text-center w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                    Enter to Ethereum lottery
                </button><br />
                <button type="button" className=" text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 w-25 mb-6"
                    onClick={() => isBSC ? buyTickets(price, _name) : alert('please connect to BSC')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2000 2000"><g fill="#f3ba2f" ><path d="M611.59 840.42l388.4-388.39 388.6 388.59 226-226L999.99 0 385.6 614.42l225.99 226M.006 999.969l226.007-226.007 225.992 225.993L226 1225.96zM611.59 1159.58l388.4 388.39 388.59-388.58 226.12 225.88-.11.12L999.99 2000l-614.41-614.4-.32-.32 226.33-225.7M1548.013 1000.093l226.007-226.006 225.992 225.992-226.006 226.007z" /><path d="M1229.22 999.88h.1L999.99 770.55 830.51 940.03h-.01l-19.47 19.48-40.16 40.17-.32.31.32.33 229.12 229.13 229.33-229.33.11-.13-.21-.11" /></g></svg>
                    <span className="ml-1">
                        Enter to BNB Lottery
                    </span>
                </button>
                <hr />
                <h3>Internal use</h3>
                <div className="flex justify-around	mt-4">
                    <button type="button" className=" text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 w-25 mb-6"
                        onClick={() => generarGanador()} ><EmojiEventsIcon/> Get winner</button>

                    <button type="button" className=" text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 w-25 mb-6"
                        onClick={() => withdraw()} ><LocalAtmIcon/>  Get profit</button>
                </div>
            </div>
        </div>
    )
}
