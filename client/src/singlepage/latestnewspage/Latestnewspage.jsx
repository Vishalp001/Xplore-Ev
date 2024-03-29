import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import Topbar from '../topbarpage/Topbarpage'
import './latestnewspage.scss'
import Subscribe from '../../components/subscribe/Subscribe'
import Footer from '../../components/footer/Footer'

const Latestnews = (props) => {
  const [pageNumber, setPageNumber] = useState(0)
  const usersPerpage = 3
  const pagesVisited = pageNumber * usersPerpage

  const displayUsers = props.news
    .slice(pagesVisited, pagesVisited + usersPerpage)
    .map((n) => {
      return (
        <div className='gridItem latestNewsCard'>
          <Link to={`/blog/${n._id}?news`}>
            <div className='imgDiv'>
              <img src={n.photo} alt={n.title} />
            </div>
            <div className='cardContain'>
              <h1 className='title'>{n.title}</h1>
              <p
                dangerouslySetInnerHTML={{
                  __html: `${n.desc.substring(0, 150)}...`,
                }}
                className='desc'
              ></p>
            </div>
            <div className='iconAndCats'>
              <div className='cat'>
                <Link to={`?cat=${n.categories}`}>{n.categories}</Link>
              </div>
              <div className='date'>{new Date(n.createdAt).toDateString()}</div>
            </div>
          </Link>
        </div>
      )
    })

  const pageCount = Math.ceil(props.news.length / usersPerpage)

  console.log(pageCount, 'pageCount')

  const changePage = ({ selected }) => {
    setPageNumber(selected)
    window.scrollTo(0, 0)
  }

  return (
    <>
      <Topbar />
      <div className='spQuickbitesWrapper'>
        <div className='container spQuickbites'>
          <div className='spHeader'>
            <h1>Latest News</h1>
            <p>Well Researched, Latest News for your daily EV updates:</p>
          </div>

          <div className='spQBCards'>
            <div className='gridContainer'>{displayUsers}</div>
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
      </div>

      <div>
        <Subscribe />
        <Footer />
      </div>
    </>
  )
}

export default Latestnews
