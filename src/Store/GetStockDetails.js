
import { createSlice } from "@reduxjs/toolkit";

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
        'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
    }
};

const initialGetStockDetails = { stock: [], details: [],chartPreviousClose:[]};


const GetStockDetailsSlice = createSlice({

    name: 'GetStockDetails',
    initialState: initialGetStockDetails,
    reducers: {
        setstock(state, action) {
            state.stock.push(action.payload);
               
        },
        setstockdetails(state, action) {
            state.details.push(action.payload);
        },
        setchartPreviousClose(state,action){
            state.chartPreviousClose.push(action.payload);
        }
    }

})


export const getstockdetails = (symbol, shortname) => {
    return (dispatch) => {
        console.log('run details')
        fetch(`https://yh-finance.p.rapidapi.com/stock/v2/get-chart?interval=15m&symbol=${symbol}&range=1d&region=US`, options)
            .then(response => response.json())
            .then(response => {
                let temp = [];
                response.chart.result[0].indicators.quote[0].close.map(per => {
                    return temp.push({ Price: per,time:`` });
                })
                dispatch(GetStockDetailsActions.setchartPreviousClose(response.chart.result[0].meta.chartPreviousClose));
                dispatch(GetStockDetailsActions.setstock(temp));
                dispatch(GetStockDetailsActions.setstockdetails({ symbol: symbol, shortname: shortname }));
            }
            )
            .catch(err => console.error(err));


    }
}


export const GetStockDetailsActions = GetStockDetailsSlice.actions;
export default GetStockDetailsSlice.reducer;