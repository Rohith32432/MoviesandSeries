import { configureStore } from "@reduxjs/toolkit";
import ApiSlices from './ApiSlices'
const store=configureStore(
    {
        reducer:{
            apis:ApiSlices
        }
    }
)

export default store