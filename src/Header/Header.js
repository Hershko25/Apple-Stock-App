import React from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';



const HeaderPage = styled.header`

   

    & h1{
    color: gray;
    font-size: 32px;
    margin-top: 0;
    padding-left: 25px;
    }

    & h2{
       color: white;
       margin-bottom: 0;
       padding-left: 25px;
    }

    & hr{
        color: #1c1c1e;
        border:solid 1px #1c1c1e;
        width: 98%;
    }

`;


export default function Header() {

    let now = new Date().toLocaleDateString('en-us', { month: "long", day: "numeric" });

    return (
        <HeaderPage>
            <h2>Stocks</h2>
            <h1>{now}</h1>
            <SearchBar />
            <hr />
        </HeaderPage>
    )
}
