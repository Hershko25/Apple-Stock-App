import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import {getstockdetails} from '../Store/GetStockDetails'
import {GetStockActions} from '../Store/GetStock'



const SymbolsSection = styled.section`

    color: white;

    & ul{
        list-style-type: none;

        & li{
            cursor: pointer;
        }


        & .stock_details{
            display: flex;
            height: 50px;

        & .p_title{
            font-size: 12px;
            margin-left: 5px;
            color:  #303136;
            margin-top: 25px;
        }
        }

        & .stock_name{
            margin-top: 0;

            @media (max-width: 992px){
                font-size: 12px;
            }
        }

        & hr{
            color: #1c1c1e;
            border:solid 1px #1c1c1e;
            width: 98%;
            margin-right: 25px;
            @media (max-width: 992px){
                width: 95%;
            }
        }
    }
`;

export default function SearchSection() {

    const dispatch = useDispatch();
    const GetStock = useSelector((state) => state.GetStock.Array);
    const stock = useSelector(state => state.GetStockDetails.details);


    const stockset =(symbol,shortname)=>{
        dispatch(GetStockActions.setstock([]))
        const existingItem =  stock.find((item) => item.symbol === symbol);
        if(!existingItem){
           
            dispatch(getstockdetails(symbol,shortname))
            dispatch(GetStockActions.setstock([]))
        }
    }

    return (
        <SymbolsSection>
            {GetStock.length !== 0 && (
                <ul >
                  <h1>Symbols</h1>
                    {GetStock.map((per, key) => {
                        return (
                            <li key={key} onClick={()=>stockset(per.symbol,per.shortname)}>
                                <div className='stock_details'>
                                    <h4>{per.symbol}</h4>
                                    <p className='p_title'>{per.exchDisp}•USD</p>
                                </div>
                                <p className='stock_name'>{per.shortname}</p>
                                <hr/>
                            </li>
                        );
                    })}
                </ul>
            )}
        </SymbolsSection>
    )
}


