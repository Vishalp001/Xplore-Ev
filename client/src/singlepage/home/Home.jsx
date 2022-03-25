import React from 'react'
import ElectricBikes from '../../components/electricBikes/ElectricBikes'
import ElectricCar from '../../components/electricCar/ElectricCar'
import Evknowledge from '../../components/evKnowledge/Evknowledge'
import KnowEv from '../../components/knowEv/KnowEv'
import LetestNews from '../../components/letestNews/LetestNews'
import Quickbytes from '../../components/quickbytes/Quickbytes'
import Subscribe from '../../components/subscribe/Subscribe'
import Topbar from '../../components/topBar/Topbar'
import Trending from '../../components/trending/Trending'
import Find from '../../components/find/Find'
import OurVideos from '../../components/ourVideos/OurVideos'
import { useLocation } from 'react-router-dom'

const Home = ({ trendings, quickBites }) => {
  return (
    <>
      <Topbar />
      <Trending trendings={trendings} />
      <Find />
      <Quickbytes quickBites={quickBites} />
      <ElectricCar />
      <ElectricBikes />
      <OurVideos />
      <LetestNews />
      <Evknowledge />
      <KnowEv />
      {/* <Subscribe /> */}
      {/* <Footer /> */}
    </>
  )
}

export default Home
