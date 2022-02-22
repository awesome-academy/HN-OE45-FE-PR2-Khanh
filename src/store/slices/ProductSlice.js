import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import queryString from 'query-string'

const initialState = {
    allProducts: {
        listAllProducts: [],
        isLoading: false
    },
    pagination: {
        _limit: 2,
        _totalRows: 1,
        isLoading: false
    },
    filter: {
        _limit: 2,
        _page: 1,
        name_like: '',
        brand_like: '',
        categories_like: '',
        rating_like: '',
        label_like: '',
        type_like: '',
        _sort: '',
        _order: ''
    },
    categories: {
        categoriesList: [],
        isLoading: false
    },
    brands: {
        brandsList: [],
        brandsListChecked: [],
        isLoading: false
    },
    types: {
        typesList: [],
        isLoading: false
    },
    currentPage: 1,
    error: null,
    inputSearch: '',
    relatedSearch: [],
    productDetails: {
        content: [],
        isLoading: false,
        similar: {
            isLoading: false,
            list: []
        },
        filter: {
            _page: 1,
            _limit: 2
        }
    }
}

export const getAllProducts = createAsyncThunk(
    'products/all',
    async (filter, { rejectWithValue }) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios(
                {
                    method: 'GET',
                    url: `http://localhost:4000/data?${paramString}`
                }
              );
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getPagination = createAsyncThunk(
    'pagination',
    async (filter, { rejectWithValue }) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios(
                {
                    method: 'GET',
                    url: `http://localhost:4000/data?${paramString}`
                }
              );
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getPostApi = createAsyncThunk(
    'products/allApi',
    async (filter, { rejectWithValue }) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios(
                {
                    method: 'GET',
                    url: `http://localhost:4000/data?${paramString}`
                }
              );
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getProductDetailsDbJson = createAsyncThunk(
    'products/details',
    async (id, { rejectWithValue }) => {
        try {
            const res = await axios.get(`http://localhost:4000/data?id=${id}`)
            return res.data
        } 
        catch (err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const getSimilarProducts = createAsyncThunk(
    'products/similar',
    async (filter, { rejectWithValue }) => {
        try {
            const paramString = queryString.stringify(filter)
            const res = await axios.get(`http://localhost:4000/data?${paramString}`)
            return res.data
        }
        catch(err) {
            return rejectWithValue(err.res.data)
        }
    }
)

export const ProductsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        clearAllFilter: (state) => {
            state.filter = {
                ...state.filter,
                _limit: 2,
                _page: 1,
                name_like: '',
                brand_like: '',
                categories_like: '',
                rating_like: '',
                type_like: '',
                _sort: '',
                _order: ''
            }
            state.currentPage = 1
            state.viewMode = true
            state.inputSearch = ''
        },
        setInputSearch: (state, action) => {
            state.inputSearch = action.payload
        },
        setBrandsListChecked: (state, action) => {
            state.brands.brandsListChecked = action.payload
        },
        setRelatedSearch: (state, action) => {
            state.relatedSearch.push(action.payload)
        },
        setFilterSimilar: (state, action) => {
            state.productDetails.filter = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.allProducts.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.allProducts.isLoading = false
                state.allProducts.listAllProducts = action.payload
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.allProducts.isLoading = false
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
            .addCase(getPagination.pending, (state) => {
                state.pagination.isLoading = true
            })
            .addCase(getPagination.fulfilled, (state, action) => {
                state.pagination._totalRows = action.payload.length
            })
            .addCase(getPagination.rejected, (state, action) => {
                state.pagination.isLoading = false
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
            .addCase(getPostApi.pending, (state) => {
                state.categories.isLoading = true
                state.brands.isLoading = true
                state.types.isLoading = true
            })
            .addCase(getPostApi.fulfilled, (state, action) => {
                state.categories.isLoading = false
                state.brands.isLoading = false
                state.types.isLoading = false

                action.payload.forEach((item) => {
                    if (state.categories.categoriesList.indexOf(item.categories) === -1) {
                        state.categories.categoriesList.push(item.categories)
                    }
                })  
                action.payload.forEach((item) => {
                    if (state.brands.brandsList.indexOf(item.brand) === -1) {
                        state.brands.brandsList.push(item.brand)
                    }
                })      
                action.payload.forEach((item) => {
                    if (state.types.typesList.indexOf(item.type) === -1) {
                        state.types.typesList.push(item.type)
                    }
                })    
            })     
            .addCase(getPostApi.rejected, (state, action) => {
                state.categories.isLoading = false
                state.brands.isLoading = false
                state.types.isLoading = false
                
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
            .addCase(getProductDetailsDbJson.pending, (state) => {
                state.productDetails.isLoading = true
            })
            .addCase(getProductDetailsDbJson.fulfilled, (state, action) => {
                state.productDetails.isLoading = false
                state.productDetails.content = action.payload   
            })
            .addCase(getProductDetailsDbJson.rejected, (state, action) => {
                state.productDetails.isLoading = false
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
            .addCase(getSimilarProducts.pending, (state) => {
                state.productDetails.similar.isLoading = true
            })
            .addCase(getSimilarProducts.fulfilled, (state, action) => {
                state.productDetails.similar.isLoading = false
                // const similarList = action.payload.filter(item => item.id !== state.productDetails.content[0].id)
                state.productDetails.similar.list = action.payload
            })
            .addCase(getSimilarProducts.rejected, (state, action) => {
                state.productDetails.similar.isLoading = false
                if (action.payload) {
                    state.error = action.payload.errorMessage
                } else {
                    state.error = action.error.message
                }
            })
    }
})

export const { setFilter, setCurrentPage, clearAllFilter, setInputSearch, setRelatedSearch, setFilterSimilar } = ProductsSlice.actions

export default ProductsSlice.reducer
