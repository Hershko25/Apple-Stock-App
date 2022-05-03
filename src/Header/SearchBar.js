
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { getstock } from '../Store/GetStock';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';



const Search = styled.div`

display: flex;
align-items: center;
flex-direction: column;


& input {
    background-color:#1c1c1e ;
    border: none;
    outline: none;
    border-radius: 5px;
    width: 95vw;
    height: 40px;
    color: white;
    font-size: 18px;
    padding-left: 10px;

        @media (max-width: 992px){
           width: 90vw;
        }
       

  &::placeholder {
  color:white;
}
  
}
`;


export default function SearchBar() {

    const dispatch = useDispatch();
    const GetStock = useSelector((state) => state.GetStock.Array);
    const [value, setvalue] = useState('');

    useEffect(() => {
        if (GetStock.length === 0) {
            setvalue('')
        }
    }, [GetStock])


    const handleFilter = (event) => {
        setvalue(event.target.value);
        if (event.target.value !== '') {
            dispatch(getstock(event.target.value));

        }
        else {
            dispatch(getstock());
        }
    };

    return (
        <div>
            <Search >
                <div >
                    <input
                        type="text"
                        onChange={handleFilter}
                        placeholder={'Search'}
                        value={value}
                    />
                </div>
            </Search>
        </div>
    )
}
