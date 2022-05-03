import { createSlice } from "@reduxjs/toolkit";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
    }
};

const initialGetStock = { Array: [] };


const GetStockSlice = createSlice({

    name: 'GetStock',
    initialState: initialGetStock,
    reducers: {
        setstock(state, action) {
            state.Array = action.payload;

        }
    }

})


export const getstock = (event) => {
    return (dispatch) => {
        if (event !== undefined) {
            console.log('run Get')
            fetch(`https://yh-finance.p.rapidapi.com/auto-complete?q=${event}&region=US`, options)
                .then(response => response.json())
                .then((response) => {
                    let temp = [];
                    response.quotes.map((per) => {
                         return temp.push({ symbol: per.symbol, exchDisp: per.exchDisp, shortname: per.shortname })
                    })
                    dispatch(GetStockActions.setstock(temp))
                }
                )
                .catch(err => console.error(err));
        }
        else{
            dispatch(GetStockActions.setstock([]))
        }
    }
}


export const GetStockActions = GetStockSlice.actions;
export default GetStockSlice.reducer;

