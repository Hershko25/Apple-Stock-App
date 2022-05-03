import { configureStore } from '@reduxjs/toolkit';
import GetStockReducer from './GetStock';
import GetStockDetailsReducer from './GetStockDetails';
import GetNewsReducer from './GetNews';

const store=configureStore({
    reducer:{GetStock:GetStockReducer,GetStockDetails:GetStockDetailsReducer,News:GetNewsReducer}
})

export default store;