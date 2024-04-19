import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllBrands, fetchAllCategories, fetchAllProducts,fetchAllProductsByFilters, fetchProductById } from "./productAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems:0,
  selectedProduct:[],
};


export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    
    const response = await fetchAllProducts();
    
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductByIdAsync = createAsyncThunk(
  "product/fetchProductById",
  async (id) => {
    console.log("sparam id: ",id)
    const response = await fetchProductById(id);
    
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllCategoriesAsync = createAsyncThunk(
  "product/fetchAllCategories",
  async () => {
    console.log("Categories fetching");
    const response = await fetchAllCategories();
    console.log("Categories fetched: ",response.data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchAllBrandsAsync = createAsyncThunk(
  "product/fetchAllBrands",
  async () => {
    console.log("Brands fetching");
    const response = await fetchAllBrands();
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
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.selectedProduct = action.payload;
      })
      .addCase(fetchAllCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchAllBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
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
export const selectAllBrands = (state) => state.product.brands;
export const selectAllCategories = (state) => state.product.categories;
export const selectedProductById = (state) => state.product.selectedProduct;


export default productSlice.reducer;
