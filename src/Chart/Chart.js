import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AreaChart, CartesianGrid, XAxis, YAxis, Area } from 'recharts';
import StockAllInfo from '../StockAllInfo/StockAllInfo';

const StockContainer = styled.ul`

  color: white;
  padding: 15px 25px 0px 25px;
  margin-top:25px;
  display: flex;
  height: 150px;
  flex-direction: column;

  & .stocktitle{
    width: 150px;
  }
 

  & .stocksection{
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

  }

  & .name{
    color: #808080;
    font-size: 10px;
  }

  & .percentage{
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 25px;
      width: 50px;
      padding-right:5px ;
      border-radius: 4px;
      margin-left: 10px;

      & p{
        font-size: 14px;
      }
  }

  & .stockpoint{
    margin-top: 0;
    text-align: right;
  }


`;


export default function Chart() {

  const stockPrice = useSelector(state => state.GetStockDetails);
  const [stock, setstock] = useState([]);


  const fullstock = (symbol,name,stock,PreviousClose,key) => {
    setstock([{symbol,name,stock,PreviousClose,key}]);
  }


  return (
    <>

      <StockContainer>
        {stockPrice.details.map((perdetails, key) =>
          <li className='stocksection' key={key} onClick={()=>fullstock(stockPrice.details[key].symbol,stockPrice.details[key].shortname,stockPrice.stock[key],stockPrice.chartPreviousClose[key],key)}>
            <div className='stocktitle' >
              <h4>{stockPrice.details[key].symbol}</h4>
              <p className='name'>{stockPrice.details[key].shortname}</p>
            </div>
            <AreaChart width={100} height={100} data={stockPrice.stock[key]}>
              <CartesianGrid stroke="none" />
              <XAxis display={'none'} />
              <YAxis hide type="number" domain={['auto']} />
              <Area type="monotone" dataKey="Price" stroke={stockPrice.chartPreviousClose[key] < stockPrice.stock[key][0].Price ? '#34c659' : '#ea4c3c'} fillOpacity={0.2} fill={stockPrice.chartPreviousClose[key] < stockPrice.stock[key][0].Price ? '#34c659' : '#ea4c3c'} />
            </AreaChart>
            <div >
              <p className='stockpoint'>{(stockPrice.stock[key][stockPrice.stock[key].length - 1].Price).toFixed(2)}</p>
              <div style={{ backgroundColor: stockPrice.chartPreviousClose[key] < stockPrice.stock[key][0].Price ? '#34c659' : '#ea4c3c' }} className='percentage'>
                <p > {stockPrice.chartPreviousClose[key] < stockPrice.stock[key][0].Price && '+'}
                  {((stockPrice.stock[key][stockPrice.stock[key].length - 1].Price - stockPrice.chartPreviousClose[key]) / stockPrice.chartPreviousClose[key] * 100).toFixed(2)}
                </p>
              </div>
            </div>
          </li>
        )
        }
      </StockContainer >
      {
        stock.length >0 && <StockAllInfo stock={stock}/>
      }
    </>

  )
}


