
import { createSlice } from "@reduxjs/toolkit";

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'yh-finance.p.rapidapi.com',
		'X-RapidAPI-Key': process.env.REACT_APP_API_KEY
	}
};

const initialGetNews = { news:[]};


const GetNewsSlice = createSlice({

    name: 'GetNews',
    initialState: initialGetNews,
    reducers: {
        setnews(state, action) {
            state.news.push(action.payload);
               
        }
    }

})


export const getNews = (shortname) => {
    return (dispatch) => {
        const name = shortname.split(" ");
        console.log(name[0])
        fetch(`https://yh-finance.p.rapidapi.com/auto-complete?q=${name[0]}&region=US`, options)
            .then(response => response.json())
            .then(response => {
                let temp = [];
                response.news.map((per,key) => {
                    return temp.push({ title: per.title, link:per.link });
                })
                dispatch(GetNewsActions.setnews(temp));
            }
            )
            .catch(err => console.error(err));


    }
}


export const GetNewsActions = GetNewsSlice.actions;
export default GetNewsSlice.reducer;