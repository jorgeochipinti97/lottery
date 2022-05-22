import { ErrorRounded } from "@mui/icons-material"
import { useEffect, useState } from "react"
import Web3 from "web3"
import Aos from "aos"
import "aos/dist/aos.css"
import contratoLazaro from '../abis/lottery.json'
import Footer from "../components/Footer"
import { Header } from "../components/Header"
import { ButtonConnect } from "../components/ButtonConnect"
import { CardPrice } from "../components/CardPrice"
import { CardWinner } from "../components/CardWinner"
import { CardTickets } from "../components/CardTickets"


export default function Home() {
  const [isLoaded, setIsLoeaded] = useState(false)
  const [contract, setContract] = useState()
  const [account, setAccount] = useState()
  const [price, setPrice] = useState()
  const [_name, set_name] = useState()
  const [players, setPlayers] = useState()
  const [balance, setBalance] = useState()
  const [winner, setWinner] = useState()
  const [winnerAddress, setWinnerAddress] = useState()
  const [winners, setWinners] = useState()
  const [amountPrize, setAmountPrize] = useState()
  const [contractAddress, setContractAddress] = useState()
  const [isBSC, setIsBSC] = useState()


  useEffect(() => {
    Aos.init({ duration: 2000 })

    const loadWeb3 = async () => {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        setIsLoeaded(true)
      } else {
        console.log('error al conectarse, ¿Tienes instalado Metamask?')
      }
    }
    loadWeb3()
  }, [])

  useEffect(() => {
    const loadBlockchainData = async () => {
      try {
        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        const networkId = await window.ethereum.request({ method: "net_version", });
        const networkData = contratoLazaro.networks[networkId]

        if (networkId == '97') {
          setIsBSC(true)
        } else if (networkId == '4') {
          setIsBSC(false)
        } else {
          setIsBSC(undefined)
        }

        if (networkId == '4' || networkId == '97') {
          const _abi = contratoLazaro.abi
          const address = networkData.address
          const _contract = new web3.eth.Contract(_abi, address)
          const _players = await _contract.methods.getPlayers().call()
          const __winner = await _contract.methods.getWinners().call()
          const __contractAddress = await _contract.methods.getContract().call()
          const stringWinner = await _contract.methods.getString(__winner[__winner.length - 1]).call()

          const amountWin = await _contract.methods.getHowMuch(__winner[__winner.length - 1]).call()

          console.log(__contractAddress)

          setWinnerAddress(__winner[__winner.length - 1])
          setWinners(__winner)
          setWinner(stringWinner)
          setAmountPrize(amountWin)
          setContractAddress(__contractAddress)
          setContract(_contract)
          setPlayers(_players)
          setBalance(_players.length * 0.001)
        }
      }
      catch (err) {
        console.log(err)
      }

    }

    loadBlockchainData()
  }, [isLoaded == true])

  const getPlayers = async () => {
    try {
      const player = await contract.methods.getPlayers().call()
      if (player.length == 0) {
        alert("No players yet")
      } else {

        alert(player)
      }
      setPlayers(player)
      console.log(player)
    } catch (err) {
      console.log(ErrorRounded)
    }
  }

  const _getWinners = async () => {

    try {
      const __winners = await contract.methods.getWinners().call()
      console.log(__winners)
      alert(__winners)
      setWinners(__winners)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <>
      <div>
        <div data-aos="fade-left" data-aos-delay="1000">
          <Header isLoaded={isLoaded} isBSC={isBSC} />
        </div>
        <div>
          <div className="flex  justify-items-center flex-col flex-nowrap mt-5">
            <div data-aos="fade-left" className='relative flex justify-center'>
              <span>
                <ButtonConnect account={account} isBSC={isBSC} />
              </span>
            </div>
            <CardPrice isBSC={isBSC} balance={balance} />
            <CardWinner winnerAddress={winnerAddress} winner={winner} isLoaded={isLoaded} />
            <div className="mb-10" data-aos="fade-right" >
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => getPlayers()} >Get Players</button>
              <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => _getWinners()} >Get Last Winners</button>
            </div>
            <div data-aos="fade-right" className=' flex justify-center'>
              <CardTickets contract={contract} isBSC={isBSC} account={account} />
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  )
}

