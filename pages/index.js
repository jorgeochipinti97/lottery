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

        try {
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
        } catch (err) {
          console.log(err)
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
        if (isBSC == true || isBSC == false) {
          const load = async()=>{
            window.ethereum.request({ method: "eth_requestAccounts" })
            await window.location.reload()
          }
          load()
        }
        else {
          alert('please connect to correct Network')
        }
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

        <div className="flex justify-center mt-4">
          {account ? null : <button type="button" className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2 "
            onClick={() => loadHandleClick()}>
            <svg className="mr-2 -ml-1 w-6 h-5" viewBox="0 0 2405 2501" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clipPath="url(#clip0_1512_1323)"> <path d="M2278.79 1730.86L2133.62 2221.69L1848.64 2143.76L2278.79 1730.86Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M1848.64 2143.76L2123.51 1767.15L2278.79 1730.86L1848.64 2143.76Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M2065.2 1360.79L2278.79 1730.86L2123.51 1767.15L2065.2 1360.79ZM2065.2 1360.79L2202.64 1265.6L2278.79 1730.86L2065.2 1360.79Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1890.29 1081.17L2285.34 919.338L2265.7 1007.99L1890.29 1081.17ZM2253.21 1114.48L1890.29 1081.17L2265.7 1007.99L2253.21 1114.48Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M2253.21 1114.48L2202.64 1265.6L1890.29 1081.17L2253.21 1114.48ZM2332.34 956.82L2265.7 1007.99L2285.34 919.338L2332.34 956.82ZM2253.21 1114.48L2265.7 1007.99L2318.65 1052.01L2253.21 1114.48Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1542.24 2024.17L1641 2055.7L1848.64 2143.75L1542.24 2024.17Z" fill="#E2761B" stroke="#E2761B" strokeWidth="5.94955" /> <path d="M2202.64 1265.6L2253.21 1114.48L2296.64 1147.8L2202.64 1265.6ZM2202.64 1265.6L1792.71 1130.55L1890.29 1081.17L2202.64 1265.6Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1987.86 617.696L1890.29 1081.17L1792.71 1130.55L1987.86 617.696Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M2285.34 919.338L1890.29 1081.17L1987.86 617.696L2285.34 919.338Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1987.86 617.696L2400.16 570.1L2285.34 919.338L1987.86 617.696Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M2202.64 1265.6L2065.2 1360.79L1792.71 1130.55L2202.64 1265.6Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M2382.31 236.33L2400.16 570.1L1987.86 617.696L2382.31 236.33Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M2382.31 236.33L1558.3 835.45L1547.59 429.095L2382.31 236.33Z" fill="#E2761B" stroke="#E2761B" strokeWidth="5.94955" /> <path d="M934.789 380.309L1547.59 429.095L1558.3 835.449L934.789 380.309Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1792.71 1130.55L1558.3 835.449L1987.86 617.696L1792.71 1130.55Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1792.71 1130.55L2065.2 1360.79L1682.65 1403.04L1792.71 1130.55Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M1682.65 1403.04L1558.3 835.449L1792.71 1130.55L1682.65 1403.04Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M1987.86 617.696L1558.3 835.45L2382.31 236.33L1987.86 617.696Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M940.144 2134.24L1134.69 2337.11L869.939 2096.16L940.144 2134.24Z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="5.94955" /> <path d="M1848.64 2143.75L1940.86 1793.33L2123.51 1767.15L1848.64 2143.75Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M151.234 1157.92L487.978 803.917L194.666 1115.67L151.234 1157.92Z" fill="#E2761B" stroke="#E2761B" strokeWidth="5.94955" /> <path d="M2123.51 1767.15L1940.86 1793.33L2065.2 1360.79L2123.51 1767.15ZM1558.3 835.449L1230.48 824.74L934.789 380.309L1558.3 835.449Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M2065.2 1360.79L1940.86 1793.33L1930.74 1582.12L2065.2 1360.79Z" fill="#E4751F" stroke="#E4751F" strokeWidth="5.94955" /> <path d="M1682.65 1403.04L2065.2 1360.79L1930.74 1582.12L1682.65 1403.04Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M1230.48 824.74L1558.3 835.449L1682.65 1403.04L1230.48 824.74Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1230.48 824.74L345.784 6.08252L934.79 380.309L1230.48 824.74ZM934.195 2258.58L165.513 2496.56L12.0146 1910.53L934.195 2258.58Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M265.465 1304.27L555.803 1076.41L799.14 1132.93L265.465 1304.27Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M799.139 1132.93L555.803 1076.41L686.098 538.567L799.139 1132.93Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M194.666 1115.67L555.803 1076.41L265.465 1304.27L194.666 1115.67Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1930.74 1582.12L1780.81 1506.56L1682.65 1403.04L1930.74 1582.12Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M194.666 1115.67L169.083 980.618L555.803 1076.41L194.666 1115.67Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1749.88 1676.72L1780.81 1506.56L1930.74 1582.12L1749.88 1676.72Z" fill="#233447" stroke="#233447" strokeWidth="5.94955" /> <path d="M1940.86 1793.33L1749.88 1676.72L1930.74 1582.12L1940.86 1793.33Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M555.803 1076.41L169.082 980.618L137.55 866.982L555.803 1076.41ZM686.098 538.567L555.803 1076.41L137.55 866.982L686.098 538.567ZM686.098 538.567L1230.48 824.74L799.139 1132.93L686.098 538.567Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M799.14 1132.93L1230.48 824.74L1422.65 1411.96L799.14 1132.93ZM1422.65 1411.96L826.508 1399.47L799.14 1132.93L1422.65 1411.96Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M265.465 1304.27L799.14 1132.93L826.508 1399.47L265.465 1304.27ZM1682.65 1403.04L1422.65 1411.96L1230.48 824.74L1682.65 1403.04Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1780.81 1506.56L1749.88 1676.72L1682.65 1403.04L1780.81 1506.56Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M345.784 6.08252L1230.48 824.74L686.098 538.567L345.784 6.08252Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M12.0146 1910.53L758.088 1879.59L934.195 2258.58L12.0146 1910.53Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M934.194 2258.58L758.088 1879.59L1124.58 1861.75L934.194 2258.58Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M1749.88 1676.72L1940.86 1793.33L2046.16 2041.42L1749.88 1676.72ZM826.508 1399.47L12.0146 1910.53L265.465 1304.27L826.508 1399.47ZM758.088 1879.59L12.0146 1910.53L826.508 1399.47L758.088 1879.59ZM1682.65 1403.04L1731.43 1580.33L1495.83 1594.02L1682.65 1403.04ZM1495.83 1594.02L1422.65 1411.96L1682.65 1403.04L1495.83 1594.02Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1134.69 2337.11L934.194 2258.58L1631.48 2375.79L1134.69 2337.11Z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="5.94955" /> <path d="M265.465 1304.27L151.234 1157.91L194.666 1115.67L265.465 1304.27Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1710.61 2288.92L1631.48 2375.79L934.194 2258.58L1710.61 2288.92Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="5.94955" /> <path d="M1748.09 2075.93L934.194 2258.58L1124.58 1861.75L1748.09 2075.93Z" fill="#E4761B" stroke="#E4761B" strokeWidth="5.94955" /> <path d="M934.194 2258.58L1748.09 2075.93L1710.61 2288.92L934.194 2258.58Z" fill="#D7C1B3" stroke="#D7C1B3" strokeWidth="5.94955" /> <path d="M137.55 866.982L110.777 409.462L686.098 538.567L137.55 866.982ZM194.665 1115.67L115.536 1035.35L169.082 980.618L194.665 1115.67Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1289.38 1529.76L1422.65 1411.96L1403.61 1699.92L1289.38 1529.76Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M1422.65 1411.96L1289.38 1529.76L1095.43 1630.31L1422.65 1411.96Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M2046.16 2041.42L2009.87 2014.65L1749.88 1676.72L2046.16 2041.42Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1095.43 1630.31L826.508 1399.47L1422.65 1411.96L1095.43 1630.31Z" fill="#CD6116" stroke="#CD6116" strokeWidth="5.94955" /> <path d="M1403.61 1699.92L1422.65 1411.96L1495.83 1594.02L1403.61 1699.92Z" fill="#E4751F" stroke="#E4751F" strokeWidth="5.94955" /> <path d="M89.3589 912.199L137.55 866.982L169.083 980.618L89.3589 912.199Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1403.61 1699.92L1095.43 1630.31L1289.38 1529.76L1403.61 1699.92Z" fill="#233447" stroke="#233447" strokeWidth="5.94955" /> <path d="M686.098 538.567L110.777 409.462L345.784 6.08252L686.098 538.567Z" fill="#763D16" stroke="#763D16" strokeWidth="5.94955" /> <path d="M1631.48 2375.79L1664.2 2465.03L1134.69 2337.12L1631.48 2375.79Z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="5.94955" /> <path d="M1124.58 1861.75L1095.43 1630.31L1403.61 1699.92L1124.58 1861.75Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M826.508 1399.47L1095.43 1630.31L1124.58 1861.75L826.508 1399.47Z" fill="#E4751F" stroke="#E4751F" strokeWidth="5.94955" /> <path d="M1495.83 1594.02L1731.43 1580.33L2009.87 2014.65L1495.83 1594.02ZM826.508 1399.47L1124.58 1861.75L758.088 1879.59L826.508 1399.47Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1495.83 1594.02L1788.55 2039.64L1403.61 1699.92L1495.83 1594.02Z" fill="#E4751F" stroke="#E4751F" strokeWidth="5.94955" /> <path d="M1403.61 1699.92L1788.55 2039.64L1748.09 2075.93L1403.61 1699.92Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M1748.09 2075.93L1124.58 1861.75L1403.61 1699.92L1748.09 2075.93ZM2009.87 2014.65L1788.55 2039.64L1495.83 1594.02L2009.87 2014.65Z" fill="#F6851B" stroke="#F6851B" strokeWidth="5.94955" /> <path d="M2068.18 2224.07L1972.99 2415.05L1664.2 2465.03L2068.18 2224.07ZM1664.2 2465.03L1631.48 2375.79L1710.61 2288.92L1664.2 2465.03Z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="5.94955" /> <path d="M1710.61 2288.92L1768.92 2265.72L1664.2 2465.03L1710.61 2288.92ZM1664.2 2465.03L1768.92 2265.72L2068.18 2224.07L1664.2 2465.03Z" fill="#C0AD9E" stroke="#C0AD9E" strokeWidth="5.94955" /> <path d="M2009.87 2014.65L2083.05 2059.27L1860.54 2086.04L2009.87 2014.65Z" fill="#161616" stroke="#161616" strokeWidth="5.94955" /> <path d="M1860.54 2086.04L1788.55 2039.64L2009.87 2014.65L1860.54 2086.04ZM1834.96 2121.15L2105.66 2088.42L2068.18 2224.07L1834.96 2121.15Z" fill="#161616" stroke="#161616" strokeWidth="5.94955" /> <path d="M2068.18 2224.07L1768.92 2265.72L1834.96 2121.15L2068.18 2224.07ZM1768.92 2265.72L1710.61 2288.92L1748.09 2075.93L1768.92 2265.72ZM1748.09 2075.93L1788.55 2039.64L1860.54 2086.04L1748.09 2075.93ZM2083.05 2059.27L2105.66 2088.42L1834.96 2121.15L2083.05 2059.27Z" fill="#161616" stroke="#161616" strokeWidth="5.94955" /> <path d="M1834.96 2121.15L1860.54 2086.04L2083.05 2059.27L1834.96 2121.15ZM1748.09 2075.93L1834.96 2121.15L1768.92 2265.72L1748.09 2075.93Z" fill="#161616" stroke="#161616" strokeWidth="5.94955" /> <path d="M1860.54 2086.04L1834.96 2121.15L1748.09 2075.93L1860.54 2086.04Z" fill="#161616" stroke="#161616" strokeWidth="5.94955" /> </g> <defs> <clipPath id="clip0_1512_1323"> <rect width="2404" height="2500" fill="white" transform="translate(0.519043 0.132812)" /> </clipPath> </defs> </svg>
            Connect with MetaMask
          </button>}
        </div>
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
