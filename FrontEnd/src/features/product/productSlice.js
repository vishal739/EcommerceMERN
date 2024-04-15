import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts,fetchAllProductsByFilters } from "./productAPI";

const initialState = {
  products: [],
  status: "idle",
  totalItems:0,
};


export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
// export const sortAllProductsAsync = createAsyncThunk(
//   "product/sortAllProducts",
//   async (queryString) => {
//     console.log("sorting in async");
//     const response = await sortAllProducts(queryString);
//     console.log(response);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );
export const fetchAllProductsByFiltersAsync = createAsyncThunk(
  "product/fetchAllProductsByFilters",
  async ({filter,sort,pagination}) => {
    console.log("Filter async",filter,sort);
    const response = await fetchAllProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    console.log("response.data:", response.data);
    return response.data;
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
   
  },
   extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchAllProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems= action.payload.totalItems;
      });
  },
});

export const { increment } = productSlice.actions;


export const selectAllProducts = (state) => state.product.products;
export const selectTotalItems = (state) => state.product.totalItems;


export default productSlice.reducer;
