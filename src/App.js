import React from 'react';
import Chart from './Chart/Chart';
import Heeader from './Header/Header';
import SearchSection from './SearchSection/SearchSection';
import { useSelector } from 'react-redux';

export default function App() {
  const stockprice = useSelector(state => state.GetStockDetails);
  return (
    <main>
      <Heeader />
      <SearchSection />
      {
        stockprice.stock.length > 0 ? <Chart/> : ''
      }
    </main>
  )
}
