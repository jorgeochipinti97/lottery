import { useEffect, useState } from "react";
import Image from 'next/image'
import Web3 from "web3"

import contractLottery from '../abis/Lottery.json'
import { Layout } from "../components/layout";
import { Balance } from "../components/card/balance";
import { Winner } from "../components/card/winner";
import { ContractAddress } from "../components/card/contractAddress/ContractAddress";


export default function Home() {
  const [isLoad, setIsLoad] = useState(false)
  const [account, setAccount] = useState()
  const [contract, setContract] = useState()
  const [number, setNumber] = useState()
  const [name, setName] = useState()
  const [winner, setWinner] = useState()
  const [winners, setWinners] = useState()
  const [balance, setBalance] = useState()
  const [winnerAddress, setWinnerAddress] = useState()
  const [amountPrize, setAmountPrize] = useState()
  const [contractAddress, setContractAddress] = useState()
  const [isBSC, setIsBSC] = useState()





  useEffect(() => {

    const loadWeb3 = async () => {
      if (window.ethereum) {
        setIsLoad(true)
        window.web3 = new Web3(window.ethereum)
      } else {
        console.log('error al conectarse, ¿Tienes instalado Metamask?')
      }



    }
    loadWeb3()

  }, [])


  useEffect(() => {
    try {
      const loadBlockchain = async () => {

        const web3 = window.web3
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        console.log(accounts[0])

        const networkId = await window.ethereum.request({ method: "net_version", });
        const networkData = contractLottery.networks[networkId]

        if (networkId == '97') {
          setIsBSC(true)
        } else if (networkId == '4') {
          setIsBSC(false)
        } else {
          setIsBSC(undefined)
        }

        if (networkId == '4' || networkId == '97') {
          const _abi = contractLottery.abi
          const address = networkData.address
          const _contract = new web3.eth.Contract(_abi, address)
          const _players = await _contract.methods.getPlayers().call()
          const __winner = await _contract.methods.getWinners().call()
          const __contractAddress = await _contract.methods.getContract().call()
          const stringWinner = await _contract.methods.getString(__winner[__winner.length - 1]).call()
          const amountWin = await _contract.methods.getHowMuch(__winner[__winner.length - 1]).call()

          setContract(_contract)
          setWinnerAddress(__winner[__winner.length - 1])
          setWinners(__winner)
          setWinner(stringWinner)
          setAmountPrize(amountWin)
          setContractAddress(__contractAddress)
          setBalance(_players.length * 0.001)

        }

      }
    } catch (err) {
      console.log(err)
    }
    loadBlockchain()
  }, [isLoad == true])
  //________________________________
  const buyTickets = async (e, c) => {

    try {
      const precio = e * 0.001
      const ethers = window.web3.utils.toWei(String(precio), 'ether')
      const buy = await contract.methods.enter(e, c).send({ from: account, value: ethers })
      if (buy) {
        window.location.reload()
      }
    }
    catch (err) {
      console.log(err)
      alert('Please fill all the inputs')
    }
  }

  const generarGanador = async () => {
    try {


      const getWinner = await contract.methods.pickWinner().send({ from: account })
      if (getWinner) {
        window.location.reload()
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getPlayers = async () => {
    try {
      const player = await contract.methods.getPlayers().call()
      if (player.length == 0) {
        alert("No players yet")
      } else {
        alert(player)

      }

      console.log(player)
    } catch (err) {
      console.log(err)
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

  const withdraw = async () => {
    try {

      await contract.methods.withdraw().send({ from: account })

    } catch (err) {
      console.log(err)
    }
  }

  //_________________

  const loadHandleClick = () => {
    {
      try {
        window.ethereum.request({ method: "eth_requestAccounts" })
      }
      catch (err) {
        alert('the connection failed, install a web3 provider')
      }
    }
  }

  return (
    <>

      <Layout account={account} isLoad={isLoad}>
        <div className="flex justify-center mt-4">
          {isBSC == undefined ? <span data-aos="fade-left">Please connect to correct Network</span> : null}
          {isLoad ? null : <span data-aos="fade-left">Please connect install Metamask </span>}

          {isLoad ? <div>

            {isBSC ? <span data-aos="fade-left">
              you are connect to BSC
            </span> : null}
          </div> : null}

          {isBSC == false ? <span data-aos='fade-left'>you are connect to Rinkeby</span> : null}

        </div>


        {isLoad ? null : <button onClick={() => loadHandleClick()}> connect to metamask</button>}
        <div className="flex justify-center mt-4">
          <Balance isBSC={isBSC} balance={balance} />
        </div>
        <div className="flex justify-center mt-4">
          <Winner winner={winner} address={winnerAddress} />
        </div>
        <div className="flex justify-center mt-4">
          <ContractAddress contract={contractAddress} />
        </div>

        <div className="flex justify-center mt-4">
          <Image src="/lottery.jpeg" width={800} height={1000} alt='lottery' />
        </div>

        <div className="flex flex-col justify-center mt-4 w-100">

          <div className="self-center mt-3">
            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-100 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <br />
            <input className="mt-3 bg-gray-200 appearance-none border-2 border-gray-200 rounded w-100 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type='text' placeholder="Nº Tickets" onChange={(e) => setNumber(e.target.value)} />
          </div>
          <div className="self-center mt-3">
            <div className="flex flex-col justify-center">
              <div className="self-center">

                <button type="button" className="mr-3 text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 w-25 mb-2 "
                  onClick={() => {
                    if (!isBSC) {
                      buyTickets(number, name)
                    } else {
                      alert('Please connect to ETH Network')
                    }
                  }
                  }
                >
                  <svg className=" text-center w-4 h-4 mr-2 -ml-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                  Enter to Ethereum lottery
                </button>
              </div>
              <div className="self-center">
                <button type="button" className=" text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 w-25 mb-2 "
                  onClick={() => {
                    if (isBSC) {
                      buyTickets(number, name)
                    } else {
                      alert('Please connect to BSC Network')
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 2000 2000"><g fill="#f3ba2f" ><path d="M611.59 840.42l388.4-388.39 388.6 388.59 226-226L999.99 0 385.6 614.42l225.99 226M.006 999.969l226.007-226.007 225.992 225.993L226 1225.96zM611.59 1159.58l388.4 388.39 388.59-388.58 226.12 225.88-.11.12L999.99 2000l-614.41-614.4-.32-.32 226.33-225.7M1548.013 1000.093l226.007-226.006 225.992 225.992-226.006 226.007z" /><path d="M1229.22 999.88h.1L999.99 770.55 830.51 940.03h-.01l-19.47 19.48-40.16 40.17-.32.31.32.33 229.12 229.13 229.33-229.33.11-.13-.21-.11" /></g></svg>
                  <span className="ml-1">
                    Enter to BNB Lottery
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="flex flex-col justify-center mt-4">
          <div className="self-center">

            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700" onClick={() => generarGanador()} >Pick winner</button>
            <button className="text-white bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800 dark:border-gray-700" onClick={() => withdraw()} >Get profit</button>
            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => getPlayers()} >Get players</button>
            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => _getWinners()} >Get winners</button>
            <button className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => alert(winner)} >Get Winner Name</button>
          </div>
        </div>

      </Layout>







    </>
  )
}
