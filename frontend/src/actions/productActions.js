import { 
    PRODUCT_LIST_FALE,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FALE,
    PRODUCT_DETAILS_REQUEST
} from '../constants/productConstants'
import axios from 'axios'

export const listProducts = () => async (dispatch) =>{
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST})
        
        const { data } = await axios.get('/api/products')
        
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_LIST_FALE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            
        })
    }
}

export const listProductDetails = (id) => async (dispatch) =>{
    try{
        dispatch({ type: PRODUCT_DETAILS_REQUEST})
        
        const { data } = await axios.get(`/api/products/${id}`)
        
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: PRODUCT_DETAILS_FALE,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
            
        })
    }
}