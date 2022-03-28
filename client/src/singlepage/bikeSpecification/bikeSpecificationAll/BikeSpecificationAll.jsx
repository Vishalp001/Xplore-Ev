import React, { useState } from 'react'
import './BikeSpecificationAll.scss'
import TopBarPage from '../../topbarpage/Topbarpage'
import { Link } from 'react-router-dom'
const BikeSpecificationAll = (props) => {
  return (
    <>
      <TopBarPage />
      <div className='container'>
        <div className='spHeader'>
          <h1>Electric Bikes</h1>
          <p>
            3 Min reads that are fun, insightful and easy to understand.
            <br />
            This is Finshots as you know it.
          </p>
        </div>

        {/* ------------ */}
        <div className='allCarCards'>
          {props.eBike.map((eC) => (
            <div className='allCarItems'>
              <div className='imgDiv'>
                <img src={eC.imgOne} alt={eC.eBikeName} />
              </div>
              <div className='carInfo'>
                <div className='carName'>{eC.eBikeName}</div>
                <div className='carPrice'>Rs {eC.eBikePrice}*</div>
                <div className='carBtns'>
                  <button className='specificationBtn'>
                    <Link to={`/e_bike/${eC._id}`}>Specification</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BikeSpecificationAll