import React from 'react'
import { Link } from 'react-router-dom'
import Topbar from '../topbarpage/Topbarpage'
import './latestnewspage.scss'
import { GrTwitter, GrFacebook } from 'react-icons/gr'
import { FaLinkedin } from 'react-icons/fa'
const Latestnews = (props) => {
  return (
    <>
      <Topbar />
      <div className='spQuickbitesWrapper'>
        <div className='container spQuickbites'>
          <div className='spHeader'>
            <h1>Latest News</h1>
            <p>
              3 Min reads that are fun, insightful and easy to understand.
              <br />
              This is Finshots as you know it.
            </p>
          </div>

          <div className='spQBCards'>
            <div className='gridContainer'>
              {props.news &&
                props.news.map((n) => (
                  <div className='gridItem'>
                    <Link to={`/latestnewsblog/${n._id}`}>
                      <div className='imgDiv'>
                        <img src={n.photo} alt={n.title} />
                      </div>
                      <div className='cardContain'>
                        <h1 className='title'>{n.title}</h1>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: `${n.desc.substring(0, 300)}...`,
                          }}
                          className='desc'
                        ></p>
                      </div>
                      <div className='iconAndCats'>
                        <div className='cat'>
                          <Link to={`?cat=${n.categories}`}>
                            {n.categories}
                          </Link>
                        </div>
                        <div className='shareIcons'>
                          <p>
                            <GrTwitter />
                          </p>
                          <p>
                            <FaLinkedin />
                          </p>
                          <p>
                            <GrFacebook />
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Latestnews
