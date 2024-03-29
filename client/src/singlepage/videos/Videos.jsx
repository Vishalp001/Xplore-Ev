import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import Topbarpage from '../topbarpage/Topbarpage'
import './videos.scss'
import { BsPlayCircle } from 'react-icons/bs'
import Subscribe from '../../components/subscribe/Subscribe'
import Footer from '../../components/footer/Footer'

const Videos = (props) => {
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerpage = 3
  const pagesVisited = pageNumber * usersPerpage

  const displayUsers = props.video
    .slice(pagesVisited, pagesVisited + usersPerpage)
    .map((v) => {
      return (
        <div className='vpcItem'>
          <a href={v.url} target='_blank'>
            <div className='imgDiv'>
              <div className='ytThumble'>
                <BsPlayCircle className='ytIocn' />
              </div>
              <img src={v.photo} alt={v.title} />
            </div>
            <h1 className='videoTitle'>{v.title}</h1>
          </a>
        </div>
      )
    })

  const pageCount = Math.ceil(props.video.length / usersPerpage)

  console.log(pageCount, 'pageCount')

  const changePage = ({ selected }) => {
    setPageNumber(selected)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Topbarpage />
      <div className='spQuickbitesWrapper'>
        <div className='container spQuickbites'>
          <div className='spHeader'>
            <h1>Videos</h1>
            <p>
              Reading Seems Boring? Watch Our Latest Videos On Electric Vehicles
            </p>
          </div>

          <div className='videoPageCards'>{displayUsers}</div>
        </div>
        <ReactPaginate
          previousLabel={<AiOutlineArrowLeft />}
          nextLabel={<AiOutlineArrowRight />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={'paginationBttns'}
          previousLinkClassName={'previousBttn'}
          nextLinkClassName={'nextBttn'}
          disabledClassName={'paginationDIsabled'}
          activeClassName={'paginationActive'}
        />
      </div>
      <Subscribe />
      <Footer />
    </>
  )
}

export default Videos
