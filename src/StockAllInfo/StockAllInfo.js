import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AreaChart, XAxis, YAxis, Area, Tooltip } from 'recharts';
import { useDispatch, useSelector } from "react-redux";
import { getNews } from '../Store/GetNews';

const Container = styled.div`

  width: 100vw;
  height:80vh;
  background-color: #1c1c1e;
  position: fixed;
  bottom:${props => props.up ? '-65%' : '0%'};
  border-radius:10px 10px 0px 0px;
  transition: bottom ease-in-out 0.5s;
  animation: fadein;
  animation-duration: 1s;
  overflow: auto;

  @keyframes fadein{
        0%{bottom: -100%}
        100%{bottom: -60%}
    }

   

    & .title{
      display: flex;

      & h4{
      color: white;
      padding-left: 25px;
      margin-right: 10px;
    }

    & h6{
      color: #808080;
    }

  }
  & hr{
    border: 0; 
    border-top: 2px solid #808080;
    width: 98%;
  }

  & .chart{
    display: flex;
    justify-content: center;
    font-size: 14px;


  }
  & .toggle{
    background-color: #808080;
    width: 10%;
    height: 5px;
    position: absolute;
    left: 45%;
    top:10px;
    border-radius: 25px;
  }
`;

const NewsList = styled.ul`

  color: white;
  list-style-type:none;
  overflow:auto;
  & h4{
    margin-bottom: 0;
  }

  & p{
    color:#808080;
    margin: 0;
    font-size: 12px;
  }

`;

export default function StockAllInfo({ stock }) {

  const dispatch = useDispatch();
  const GetStockNewS = useSelector((state) => state.News.news);


  useEffect(() => {
    dispatch(getNews(stock[0].name))
  }, [dispatch, stock])


  const [value, setvalue] = useState(true);

  return (
    <Container onClick={() => setvalue(prev => !prev)} up={value}>
      <div className='title'>
        <div className='toggle'></div>
        <h4>{stock[0].symbol}</h4>
        <h6>{stock[0].name}</h6>
      </div>
      <hr />
      <div className='chart'>
        <AreaChart width={410} height={250} data={stock[0].stock} margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 0,
        }} >
          <XAxis tick={false} dataKey='time' />
          <YAxis stroke="#808080" domain={['auto']} tickSize={0} />
          <Tooltip cursor={{ strokeWidth: 0 }} />
          <Area type="monotone" dataKey="Price" stroke={stock[0].PreviousClose < stock[0].stock[0].Price ? '#34c659' : '#ea4c3c'} fillOpacity={0.2} fill={stock[0].PreviousClose < stock[0].stock[0].Price ? '#34c659' : '#ea4c3c'} />
        </AreaChart>
      </div>
      <NewsList>
        {
          GetStockNewS.map((per, key) =>
            per.map((title, key) => {
              return (
                <li key={key}>
                  <a href={title.link} style={{color:'white',textDecoration:'none'}}>
                  <h4>{title.title}</h4><br/>
                  <p>{title.title}...</p>
                  </a>
                </li>)
            })

          )}
      </NewsList>
    </Container>
  )
}

